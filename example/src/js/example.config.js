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
			[window.Barchart.ProductType.PORTFOLIO.code]: [
				window.Barchart.EventType.PORTFOLIO_APPLICATION_LOADED,
				window.Barchart.EventType.PORTFOLIO_ACCESSED,
				window.Barchart.EventType.PORTFOLIO_CREATED,
				window.Barchart.EventType.PORTFOLIO_DELETED,

				window.Barchart.EventType.PORTFOLIO_TRANSACTION_CREATED,
				window.Barchart.EventType.PORTFOLIO_TRANSACTION_EDITED,
				window.Barchart.EventType.PORTFOLIO_TRANSACTION_DELTED,
				window.Barchart.EventType.PORTFOLIO_TRANSACTION_HISTORY_VIEWED_SINGLE,
				window.Barchart.EventType.PORTFOLIO_TRANSACTION_HISTORY_VIEWED_ALL,

				window.Barchart.EventType.PORTFOLIO_POSITION_CREATED,
				window.Barchart.EventType.PORTFOLIO_POSITION_DELETED,

				window.Barchart.EventType.PORTFOLIO_BROKERAGE_REPORT_DOWNLOADED,

				window.Barchart.EventType.PORTFOLIO_CUSTOM_VIEW_CREATED,
				window.Barchart.EventType.PORTFOLIO_CUSTOM_VIEW_DELETED,
			],
			[window.Barchart.ProductType.WATCHLIST.code]: [
				window.Barchart.EventType.WATCHLIST_APPLICATION_LOADED,
				window.Barchart.EventType.WATCHLIST_ACCESSED,
				window.Barchart.EventType.WATCHLIST_CREATED,
				window.Barchart.EventType.WATCHLIST_DELETED,

				window.Barchart.EventType.WATCHLIST_SYMBOL_ADDED,
				window.Barchart.EventType.WATCHLIST_SYMBOL_REMOVED,

				window.Barchart.EventType.WATCHLIST_CUSTOM_VIEW_CREATED,
				window.Barchart.EventType.WATCHLIST_CUSTOM_VIEW_DELETED,
			],
		}
	};
})();
