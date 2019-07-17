const EventGateway = require('./gateway/EventGateway'),
	ReportGateway = require('./gateway/ReportGateway');

module.exports = (() => {
	'use strict';

	return {
		EventGateway: EventGateway,
		ReportGateway: ReportGateway,
	};
})();
