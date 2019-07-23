const Config = require('./example.config');

module.exports = (() => {
	'use strict';

	const app = new Vue({
		el: '.wrapper',
		created() {
			window.Barchart.Event.ReportGateway.forStaging()
				.then((gateway) => {
					this.reportGateway = gateway;
				});
		},
		data: {
			selectedCustomer: '',
			startTime: '',
			endTime: '',

			message: '',

			reports: [ ],

			reportGateway: null,

			config: Config,
		},
		methods: {
			start() {
				if (!validateFields.call(this)) {
					this.message = 'Fill required fields';

					return;
				}

				this.message = 'Sending...';

				const filter = {
					customer: this.selectedCustomer,
				};

				if (this.startTime) {
					filter.start = parseInt(this.startTime);
				}

				if (this.endTime) {
					filter.end = parseInt(this.endTime);
				}

				this.reportGateway.startReport(filter)
					.then((response) => {
						this.reports.push({
							data: response.filter,
							link: this.reportGateway.getReportUrl(response.source),
						});

						this.message = response;
					}).catch((err) => {
						this.message = err;
					});
			},
			clear() {
				clear.call(this);
			},
		}
	});

	function clear() {
		this.reports = [ ];
		this.message = '';
	}

	function validateFields() {
		return !!this.selectedCustomer;
	}
})();
