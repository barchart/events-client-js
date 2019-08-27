const assert = require('@barchart/common-js/lang/assert'),
	Scheduler = require('@barchart/common-js/timing/Scheduler');

const EventGateway = require('../gateway/EventGateway');

module.exports = (() => {
	'use strict';

	/**
	 * A wrapper utility for an {@link @EventGateway} which caches and
	 * periodically sends new {@link Event} objects to the server.
	 *
	 * @public
	 * @param {EventGateway}
	 * @param {Function=} callback
	 */
	class EventBatcher {
		constructor(eventGateway, callback) {
			assert.argumentIsRequired(eventGateway, 'eventGateway', EventGateway, 'EventGateway');
			assert.argumentIsOptional(callback, 'callback', Function, 'Function');

			this._eventGateway = eventGateway;
			this._callback = callback;

			this._scheduler = new Scheduler();

			this._buffer = [ ];
			this._running = false;
		}

		/**
		 * Starts the scheduler for transmitting events, causing
		 * events to be periodically flushed from the buffer.
		 *
		 * @public
		 */
		start() {
			if (this._running) {
				return;
			}

			this._scheduler = new Scheduler();
			this._running = true;

			watch.call(this);
		}

		/**
		 * Stops the scheduler, causing events to accumulate in
		 * the buffer.
		 *
		 * @public
		 */
		stop() {
			this._running = false;

			if (this._scheduler !== null) {
				this._scheduler.dispose();
				this._scheduler = null;
			}
		}

		/**
		 * Clears the internal buffer of any events waiting to be
		 * sent to the server.
		 *
		 * @public
		 */
		clear() {
			this._buffer = [ ];
		}

		/**
		 * Adds a new event to the buffer.
		 *
		 * @public
		 * @param {Event} event
		 */
		push(event) {
			this._buffer.push(event);
		}

		toString() {
			return '[EventBatcher]';
		}
	}

	function watch() {
		if (!this._running) {
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
				console.error('Failed to transmit events to server', err);

				return err;
			}).then(() => {
				if (this._running) {
					this._scheduler.schedule(watch.bind(this), 5000, 'Watch');
				}
			});
	}

	return EventBatcher;
})();
