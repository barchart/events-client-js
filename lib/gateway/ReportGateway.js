const assert = require('@barchart/common-js/lang/assert'),
	Disposable = require('@barchart/common-js/lang/Disposable'),
	Enum = require('@barchart/common-js/lang/Enum');

const EndpointBuilder = require('@barchart/common-js/api/http/builders/EndpointBuilder'),
	ErrorInterceptor = require('@barchart/common-js/api/http/interceptors/ErrorInterceptor'),
	Gateway = require('@barchart/common-js/api/http/Gateway'),
	FailureReason = require('@barchart/common-js/api/failures/FailureReason'),
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
	 * @param {String} protocol - The protocol to use (either HTTP or HTTPS).
	 * @param {String} host - The host name of the Events web service.
	 * @param {Number} port - The TCP port number of the Events web service.
	 * @extends {Disposable}
	 *
	 */
	class ReportGateway extends Disposable {
		constructor(protocol, host, port) {
			super();

			this._started = false;
			this._startPromise = null;

			const protocolType = Enum.fromCode(ProtocolType, protocol.toUpperCase());

			this._startReport = EndpointBuilder.for('start-report', 'start report')
				.withVerb(VerbType.POST)
				.withProtocol(protocolType)
				.withHost(host)
				.withPort(port)
				.withRequestInterceptor(RequestInterceptor.PLAIN_TEXT_RESPONSE)
				.withRequestInterceptor(RequestInterceptor.fromDelegate(startReportRequestInterceptor))
				.withResponseInterceptor(responseInterceptorForReportDeserialization)
				.withErrorInterceptor(ErrorInterceptor.GENERAL)
				.endpoint;

			this._reportUrlGenerator = (source) => {
				return `https://${Configuration.getHost(host)}/reports/${source}`;
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
		 * Generates a URL suitable for downloading a report (as a CSV)
		 *
		 * @public
		 * @param {String} source
		 * @return {Promise<String>}
		 */
		getReportUrl(source) {
			return Promise.resolve()
				.then(() => {
					checkStart.call(this);

					assert.argumentIsRequired(source, 'source', String);

					return this._reportUrlGenerator(source);
				});
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
					return start(new ReportGateway('https', Configuration.staging, 443));
				});
		}
	}

	const startReportRequestInterceptor = (request) => {
		return FailureReason.validateSchema(EventJobSchema.START, request.data)
			.then(() => {
				return Promise.resolve(request);
			}).catch((e) => {
				console.error('Error serializing data to start report', e);

				return Promise.reject();
			});
	};

	const responseInterceptorForReportDeserialization = ResponseInterceptor.fromDelegate((response) => {
		try {
			return JSON.parse(response.data, EventJobSchema.GET.schema.getReviver());
		} catch (e) {
			console.log('Error deserializing event-job', e);
		}
	});

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
