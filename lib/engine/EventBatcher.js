const assert = require('@barchart/common-js/lang/assert'),
	Scheduler = require('@barchart/common-js/timing/Scheduler');

const EventGateway = require('../gateway/EventGateway');

module.exports = (() => {
	'use strict';

	class EventBatcher {
		constructor(eventGateway, callback) {
			assert.argumentIsRequired(eventGateway, 'eventGateway', EventGateway, 'EventGateway');
			assert.argumentIsRequired(callback, 'callback', Function, 'Function');

			this._eventGateway = eventGateway;
			this._callback = callback;

			this._currentBatch = [ ];
			this._nextBatch = [ ];

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
			this._currentBatch = [ ];
			this._nextBatch = [ ];
		}

		push(event) {
			if (this._sending) {
				this._nextBatch.push(event);
			} else {
				this._currentBatch.push(event);
			}
		}
	}

	function watch() {
		if (!this._watching) {
			return;
		}

		if (this._currentBatch.length === 0) {
			return this._scheduler.schedule(watch.bind(this), 5000, 'Watch');
		}

		console.log(`[ ${this._currentBatch.length} ] events available.`);

		this._sending = true;

		return this._eventGateway.createEvents(this._currentBatch)
			.then((response) => {
				console.log(`[ ${this._currentBatch.length} ] events successfully sent`);

				this._callback(response);

				return response;
			}).catch((err) => {
				console.error(err);

				this._callback(err);

				return err;
			}).then(() => {
				this._currentBatch = this._nextBatch;
				this._nextBatch = [ ];
				this._sending = false;

				return this._scheduler.schedule(watch.bind(this), 5000, 'Watch');
			});
	}

	return EventBatcher;
})();
