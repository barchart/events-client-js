const assert = require('@barchart/common-js/lang/assert'),
	Disposable = require('@barchart/common-js/lang/Disposable'),
	Enum = require('@barchart/common-js/lang/Enum');

const EndpointBuilder = require('@barchart/common-js/api/http/builders/EndpointBuilder'),
	ErrorInterceptor = require('@barchart/common-js/api/http/interceptors/ErrorInterceptor'),
	Gateway = require('@barchart/common-js/api/http/Gateway'),
	ProtocolType = require('@barchart/common-js/api/http/definitions/ProtocolType'),
	RequestInterceptor = require('@barchart/common-js/api/http/interceptors/RequestInterceptor'),
	ResponseInterceptor = require('@barchart/common-js/api/http/interceptors/ResponseInterceptor'),
	VerbType = require('@barchart/common-js/api/http/definitions/VerbType');

const EventJobSchema = require('@barchart/events-api-common/lib/data/serialization/EventJobSchema');

const Configuration = require('../common/Configuration');

module.exports = (() => {
	'use strict';

	/**
	 * Web service gateway for invoking the Reports API.
	 *
	 * @public
	 * @extends {Disposable}
	 * @param {String} protocol - The protocol to use (either HTTP or HTTPS).
	 * @param {String} host - The host name of the Events web service.
	 * @param {Number} port - The TCP port number of the Events web service.
	 */
	class ReportGateway extends Disposable {
		constructor(protocol, host, port) {
			super();

			this._started = false;
			this._startPromise = null;

			const protocolType = Enum.fromCode(ProtocolType, protocol.toUpperCase());

			this._startReportEndpoint = EndpointBuilder.for('start-report', 'start report')
				.withVerb(VerbType.POST)
				.withProtocol(protocolType)
				.withHost(host)
				.withPort(port)
				.withPathBuilder((pb) => {
					pb.withLiteralParameter('reports', 'reports');
				})
				.withBody('filter')
				.withRequestInterceptor(RequestInterceptor.PLAIN_TEXT_RESPONSE)
				.withResponseInterceptor(responseInterceptorForReportDeserialization)
				.withErrorInterceptor(ErrorInterceptor.GENERAL)
				.endpoint;

			this._getReportAvailabilityEndpoint = EndpointBuilder.for('get-report-availability', 'get report availability')
				.withVerb(VerbType.GET)
				.withProtocol(protocolType)
				.withHost(host)
				.withPort(port)
				.withPathBuilder((pb) => {
					pb.withLiteralParameter('reports', 'reports')
						.withVariableParameter('source', 'source', 'source', false)
						.withLiteralParameter('availability', 'availability');
				})
				.withRequestInterceptor(RequestInterceptor.PLAIN_TEXT_RESPONSE)
				.withResponseInterceptor(responseInterceptorForReportAvailabilityDeserialization)
				.withErrorInterceptor(ErrorInterceptor.GENERAL)
				.endpoint;

			this._reportUrlGenerator = (source) => {
				return `https://${host}/reports/${source}`;
			};
		}

		/**
		 * Initializes the connection to the remote server and returns a promise
		 * containing the current instance.
		 *
		 * @public
		 * @returns {Promise<ReportGateway>}
		 */
		start() {
			return Promise.resolve()
				.then(() => {
					if (this._startPromise === null) {
						this._startPromise = Promise.resolve()
						.then(() => {
							this._started = true;

							return this;
						}).catch((e) => {
							this._startPromise = null;

							throw e;
						});
					}

					return this._startPromise;
				});
		}

		/**
		 * Starts a report.
		 *
		 * @public
		 * @param {Object} filter
		 * @returns {Promise<Object>}
		 */
		startReport(filter) {
			return Promise.resolve()
				.then(() => {
					checkStart.call(this);

					assert.argumentIsRequired(filter, 'filter', Object);

					return Gateway.invoke(this._startReportEndpoint, EventJobSchema.START.schema.format({ filter: filter }));
				});
		}

		/**
		 * Returns a report availability.
		 *
		 * @public
		 * @param {Object} source
		 * @return {Promise<Object>}
		 */
		getReportAvailability(source) {
			return Promise.resolve()
				.then(() => {
					checkStart.call(this);

					assert.argumentIsRequired(source, 'source', String);

					const payload = { };
					payload.source = source;

					return Gateway.invoke(this._getReportAvailabilityEndpoint, payload);
				});
		}

		/**
		 * Generates a URL suitable for downloading a report (as a CSV)
		 *
		 * @public
		 * @param {String} source
		 * @return {String}
		 */
		getReportUrl(source) {
			checkStart.call(this);

			assert.argumentIsRequired(source, 'source', String);

			return this._reportUrlGenerator(source);
		}

		/**
		 * Creates and starts a new {@link ReportGateway} for use in the staging environment.
		 *
		 * @public
		 * @static
		 * @returns {Promise<ReportGateway>}
		 */
		static forStaging() {
			return Promise.resolve()
				.then(() => {
					return start(new ReportGateway('https', Configuration.stagingHost, 443));
				});
		}

		/**
		 * Creates and starts a new {@link ReportGateway} for use in the production environment.
		 *
		 * @public
		 * @static
		 * @returns {Promise<ReportGateway>}
		 */
		static forProduction() {
			return Promise.resolve()
				.then(() => {
					return start(new ReportGateway('https', Configuration.productionHost, 443));
				});
		}
	}

	const responseInterceptorForReportDeserialization = ResponseInterceptor.fromDelegate((response) => {
		try {
			return JSON.parse(response.data, EventJobSchema.PROCESS.schema.getReviver());
		} catch (e) {
			console.log('Error deserializing report (using EventJobSchema.PROCESS schema)', e);
		}
	});

	const responseInterceptorForReportAvailabilityDeserialization = ResponseInterceptor.fromDelegate((response) => {
		try {
			return JSON.parse(response.data, EventJobSchema.PROCESS.schema.getReviver());
		} catch (e) {
			console.log('Error deserializing report availability (using EventJobSchema.PROCESS schema)', e);
		}
	});

	function start(gateway) {
		return gateway.start()
			.then(() => {
				return gateway;
			});
	}

	function checkStart() {
		if (this.getIsDisposed()) {
			throw new Error('Unable to use gateway, the gateway has been disposed.');
		}

		if (!this._started) {
			throw new Error('Unable to use gateway, the gateway has not started.');
		}
	}

	return ReportGateway;
})();
