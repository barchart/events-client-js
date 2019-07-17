const EventGateway = require('./gateway/EventGateway'),
	ReportGateway = require('./gateway/ReportGateway');

const EventBatcher = require('./engine/EventBatcher');

module.exports = (() => {
	'use strict';

	return {
		EventBatcher: EventBatcher,
		EventGateway: EventGateway,
		ReportGateway: ReportGateway,
	};
})();
