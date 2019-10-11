const Enum = require('@barchart/common-js/lang/Enum');

const CustomerType = require('@barchart/events-api-common/lib/data/CustomerType'),
	EventType = require('@barchart/events-api-common/lib/data/EventType'),
	ProductType = require('@barchart/events-api-common/lib/data/ProductType');

const version = require('../../../lib/meta').version;

module.exports = (() => {
	'use strict';

	return {
		version: version,
		customers: [
			CustomerType.TGAM,
		],
		products: [
			ProductType.PORTFOLIO,
			ProductType.WATCHLIST,
		],
		types: {
			[ProductType.PORTFOLIO.code]: Enum.getItems(EventType).filter(eventType => eventType.product === ProductType.PORTFOLIO),
			[ProductType.WATCHLIST.code]: Enum.getItems(EventType).filter(eventType => eventType.product === ProductType.WATCHLIST),
		}
	};
})();