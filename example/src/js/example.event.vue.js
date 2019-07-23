const Config = require('./example.config');

module.exports = (() => {
	'use strict';

	const app = new Vue({
		el: '.wrapper',
		created() {
			window.Barchart.Event.EventGateway.forStaging()
				.then((gateway) => {
					this.eventGateway = gateway;
					this.eventBatcher = new window.Barchart.Event.EventBatcher(gateway, callback.bind(this));
				});
		},
		data: {
			selectedCustomer: '',
			selectedProduct: '',
			selectedType: '',
			inputContext: '',

			message: '',

			events: [ ],

			auto: false,

			eventBatcher: null,
			eventGateway: null,

			config: Config,
		},
		methods: {
			generate() {
				if (!validateFields.call(this)) {
					this.message = 'Fill all fields';

					return;
				}

				const event = {
					customer: this.selectedCustomer,
					product: this.selectedProduct,
					type: this.selectedType,
					timestamp: window.Barchart.Timestamp.now().timestamp,
					context: this.inputContext.replace(' ', '').split(','),
				};

				this.events.push(event);

				if (this.auto) {
					this.eventBatcher.push(event);
				}
			},
			send() {
				if (!validateFields.call(this)) {
					this.message = 'Fill all fields';

					return;
				}

				if (this.events.length === 0) {
					this.message = 'Event stack is empty';

					return;
				}

				this.message = 'Sending...';

				this.eventGateway.createEvents(this.events)
					.then((response) => {
						clear.call(this);

						this.message = response;
					}).catch((err) => {
						clear.call(this);

						this.message = err;
					});
			},
			clear() {
				clear.call(this);
			},
			switchMode() {
				if (this.auto) {
					this.events.forEach(event => this.eventBatcher.push(event));
					this.eventBatcher.start();

					this.message = 'Auto mode enabled';
				} else {
					this.eventBatcher.stop();
					this.eventBatcher.clear();

					this.message = 'Auto mode disabled';
				}
			}
		}
	});

	function callback(response) {
		clear.call(this);

		this.message = response;
	}


	function clear() {
		this.events = [ ];
		this.message = '';
	}

	function validateFields() {
		if (!this.selectedCustomer || !this.selectedProduct || !this.selectedType || !this.inputContext) {
			return false;
		}

		return true;
	}
})();
