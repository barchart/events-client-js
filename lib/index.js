const CustomerType = require('@barchart/events-api-common/lib/data/CustomerType'),
	EventType = require('@barchart/events-api-common/lib/data/EventType'),
	ProductType = require('@barchart/events-api-common/lib/data/ProductType');

const EventGateway = require('./gateway/EventGateway'),
	ReportGateway = require('./gateway/ReportGateway');

const EventBatcher = require('./engine/EventBatcher');

module.exports = (() => {
	'use strict';

	return {
		EventBatcher: EventBatcher,
		EventGateway: EventGateway,
		ReportGateway: ReportGateway,

		CustomerType: CustomerType,
		EventType: EventType,
		ProductType: ProductType,
	};
})();
