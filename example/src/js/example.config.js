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
			}
		],
		types: [
			{
				text: window.Barchart.EventType.BROKERAGE_REPORT_DOWNLOADED.description,
				value: window.Barchart.EventType.BROKERAGE_REPORT_DOWNLOADED.code,
			}
		],
	};
})();
