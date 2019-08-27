const assert = require('@barchart/common-js/lang/assert'),
	Scheduler = require('@barchart/common-js/timing/Scheduler');

const EventGateway = require('../gateway/EventGateway');

module.exports = (() => {
	'use strict';

	class EventBatcher {
		constructor(eventGateway, callback) {
			assert.argumentIsRequired(eventGateway, 'eventGateway', EventGateway, 'EventGateway');
			assert.argumentIsOptional(callback, 'callback', Function, 'Function');

			this._eventGateway = eventGateway;
			this._callback = callback;

			this._buffer = [ ];

			this._sending = false;
			this._watching = false;

			this._scheduler = new Scheduler();
		}

		start() {
			this._watching = true;

			watch.call(this);
		}

		stop() {
			this._watching = false;
		}

		clear() {
			this._buffer = [ ];
		}

		push(event) {
			this._buffer.push(event);
		}
	}

	function watch() {
		if (!this._watching) {
			return;
		}

		if (this._buffer.length === 0) {
			return this._scheduler.schedule(watch.bind(this), 5000, 'Watch');
		}

		const batch = this._buffer;
		
		this._buffer = [ ];

		return this._eventGateway.createEvents(batch)
			.then((response) => {
				if (this._callback) {
					this._callback(response);
				}

				return response;
			}).catch((err) => {
				console.error(err);

				return err;
			}).then(() => {
				return this._scheduler.schedule(watch.bind(this), 5000, 'Watch');
			});
	}

	return EventBatcher;
})();
