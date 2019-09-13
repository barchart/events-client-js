const Enum = require('@barchart/common-js/lang/Enum');

module.exports = (() => {
	'use strict';

	return {
		version: window.Barchart.ClientVersion,
		customers: [
			window.Barchart.CustomerType.TGAM,
		],
		products: [
			window.Barchart.ProductType.PORTFOLIO,
			window.Barchart.ProductType.WATCHLIST,
		],
		types: {
			[window.Barchart.ProductType.PORTFOLIO.code]: Enum.getItems(window.Barchart.EventType).filter(eventType => eventType.product === window.Barchart.ProductType.PORTFOLIO),
			[window.Barchart.ProductType.WATCHLIST.code]: Enum.getItems(window.Barchart.EventType).filter(eventType => eventType.product === window.Barchart.ProductType.WATCHLIST),
		}
	};
})();
