const assert = require('@barchart/common-js/lang/assert'),
	Scheduler = require('@barchart/common-js/timing/Scheduler');

const EventGateway = require('../gateway/EventGateway');

module.exports = (() => {
	'use strict';

	class EventBatcher {
		constructor(eventGateway) {
			assert.argumentIsRequired(eventGateway, 'eventGateway', EventGateway, 'EventGateway');

			this._eventGateway = eventGateway;

			this._currentBatch = [ ];
			this._nextBatch = [ ];

			this._sending = false;

			this._scheduler = new Scheduler();

			this._watch();
		}

		_watch() {
			if (this._currentBatch.length === 0) {
				return this._scheduler.schedule(() => this._watch(), 5000, 'Watch');
			}

			console.log(`[ ${this._currentBatch.length} ] events available.`);

			this._sending = true;

			return this._eventGateway.createEvents(this._currentBatch)
				.then((response) => {
					console.log(`[ ${this._currentBatch.length} ] events successfully sent`);

					return Promise.resolve();
				}).catch((err) => {
					console.error(err);

					return Promise.resolve();
				}).then(() => {
					this._currentBatch = this._nextBatch;
					this._nextBatch = [ ];
					this._sending = false;

					return this._scheduler.schedule(() => this._watch(), 5000, 'Watch');
			})
		}

		push(event) {
			if (this._sending) {
				this._nextBatch.push(event);
			} else {
				this._currentBatch.push(event);
			}
		}
	}

	return EventBatcher;
})();
