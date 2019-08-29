const Timestamp = require('@barchart/common-js/lang/Timestamp');

const CustomerType = require('@barchart/events-api-common/lib/data/CustomerType'),
	EventJobStatus = require('@barchart/events-api-common/lib/data/EventJobStatus'),
	EventType = require('@barchart/events-api-common/lib/data/EventType'),
	ProductType = require('@barchart/events-api-common/lib/data/ProductType');

const EventBatcher = require('./../../../lib/engine/EventBatcher'),
	EventGateway = require('./../../../lib/gateway/EventGateway'),
	ReportGateway = require('./../../../lib/gateway/ReportGateway');

const packageJSON = require('../../../package');

module.exports = (() => {
	'use strict';

	window.Barchart = window.Barchart || { };

	window.Barchart.Timestamp = Timestamp;
	window.Barchart.CustomerType = CustomerType;
	window.Barchart.EventJobStatus = EventJobStatus;
	window.Barchart.EventType = EventType;
	window.Barchart.ProductType = ProductType;

	window.Barchart.Event = { };
	window.Barchart.Event.EventBatcher = EventBatcher;
	window.Barchart.Event.EventGateway = EventGateway;
	window.Barchart.Event.ReportGateway = ReportGateway;

	window.Barchart.ClientVersion = packageJSON.version;
})();
