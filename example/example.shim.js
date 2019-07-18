const Timestamp = require('@barchart/common-js/lang/Timestamp');

const CustomerType = require('@barchart/events-api-common/lib/data/CustomerType'),
	EventType = require('@barchart/events-api-common/lib/data/EventType'),
	ProductType = require('@barchart/events-api-common/lib/data/ProductType');

const Event = require('../lib/index');

const packageJSON = require('../package');

module.exports = (() => {
	'use strict';

	window.Barchart = window.Barchart || { };

	window.Barchart.Timestamp = Timestamp;
	window.Barchart.CustomerType = CustomerType;
	window.Barchart.EventType = EventType;
	window.Barchart.ProductType = ProductType;

	window.Barchart.Event = Event;

	window.Barchart.ClientVersion = packageJSON.version;
})();
