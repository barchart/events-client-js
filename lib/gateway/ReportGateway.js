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
	 * @param {Object} credentials - The credentials of the Report API.
	 */
	class ReportGateway extends Disposable {
		constructor(protocol, host, port, credentials) {
			super();

			assert.argumentIsRequired(credentials, 'credentials', Object);
			assert.argumentIsRequired(credentials.username, 'credentials.username', String, 'String');
			assert.argumentIsRequired(credentials.password, 'credentials.password', String, 'String');

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
				.withBasicAuthentication(credentials.username, credentials.password)
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
				.withBasicAuthentication(credentials.username, credentials.password)
				.withRequestInterceptor(RequestInterceptor.PLAIN_TEXT_RESPONSE)
				.withResponseInterceptor(responseInterceptorForReportAvailabilityDeserialization)
				.withErrorInterceptor(ErrorInterceptor.GENERAL)
				.endpoint;

			this._getReportEndpoint = EndpointBuilder.for('get-report', 'get report')
				.withVerb(VerbType.GET)
				.withProtocol(protocolType)
				.withHost(host)
				.withPort(port)
				.withPathBuilder((pb) => {
					pb.withLiteralParameter('reports', 'reports')
						.withVariableParameter('source', 'source', 'source', false);
				})
				.withBasicAuthentication(credentials.username, credentials.password)
				.withRequestInterceptor(RequestInterceptor.PLAIN_TEXT_RESPONSE)
				.withResponseInterceptor(responseInterceptorForGetReport)
				.withErrorInterceptor(ErrorInterceptor.GENERAL)
				.endpoint;

			this._getVersionEndpoint = EndpointBuilder.for('get-api-version', 'get API version')
				.withVerb(VerbType.GET)
				.withProtocol(protocolType)
				.withHost(host)
				.withPort(port)
				.withPathBuilder((pb) => {
					pb.withLiteralParameter('system', 'system')
						.withLiteralParameter('version', 'version');
				})
				.withBasicAuthentication(credentials.username, credentials.password)
				.withRequestInterceptor(RequestInterceptor.PLAIN_TEXT_RESPONSE)
				.withResponseInterceptor(responseInterceptorForGetReport)
				.withErrorInterceptor(ErrorInterceptor.GENERAL)
				.endpoint;
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
		 * Downloads a report (as a CSV)
		 *
		 * @public
		 * @param {String} source
		 * @return {Promise<Object>}
		 */
		getReport(source) {
			return Promise.resolve()
				.then(() => {
					checkStart.call(this);

					assert.argumentIsRequired(source, 'source', String);

					const payload = { };
					payload.source = source;

					return Gateway.invoke(this._getReportEndpoint, payload);
				});
		}

		/**
		 * Returns the server version.
		 *
		 * @public
		 * @return {Promise<String>}
		 */
		getVersion() {
			return Promise.resolve()
				.then(() => {
					checkStart.call(this);

					return Gateway.invoke(this._getVersionEndpoint, { });
				});
		}

		/**
		 * Creates and starts a new {@link ReportGateway} for use in the staging environment.
		 *
		 * @public
		 * @static
		 * @returns {Promise<ReportGateway>}
		 */
		static forStaging(credentials) {
			return Promise.resolve()
				.then(() => {
					return start(new ReportGateway('https', Configuration.stagingHost, 443, credentials));
				});
		}

		/**
		 * Creates and starts a new {@link ReportGateway} for use in the production environment.
		 *
		 * @public
		 * @static
		 * @returns {Promise<ReportGateway>}
		 */
		static forProduction(credentials) {
			return Promise.resolve()
				.then(() => {
					return start(new ReportGateway('https', Configuration.productionHost, 443, credentials));
				});
		}

		toString() {
			return '[ReportGateway]';
		}
	}

	const responseInterceptorForGetReport = ResponseInterceptor.fromDelegate((response) => {
		try {
			return JSON.parse(response.data);
		} catch (e) {
			console.log('Error deserializing report', e);
		}
	});

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
