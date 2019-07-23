module.exports = (() => {
	'use strict';

	return {
		version: window.Barchart.ClientVersion,
		customers: [
			{
				text: window.Barchart.CustomerType.TGAM.description,
				value: window.Barchart.CustomerType.TGAM.code,
			},
		],
		products: [
			{
				text: window.Barchart.ProductType.PORTFOLIO.description,
				value: window.Barchart.ProductType.PORTFOLIO.code,
			},
			{
				text: window.Barchart.ProductType.WATCHLIST.description,
				value: window.Barchart.ProductType.WATCHLIST.code,
			}
		],
		types: [
			{
				text: window.Barchart.EventType.ACCESSED.description,
				value: window.Barchart.EventType.ACCESSED.code,
			},
			{
				text: window.Barchart.EventType.BROKERAGE_REPORT_DOWNLOADED.description,
				value: window.Barchart.EventType.BROKERAGE_REPORT_DOWNLOADED.code,
			}
		],
	};
})();
