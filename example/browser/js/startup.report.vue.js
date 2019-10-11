const Config = require('./example.config');

const ReportGateway = require('./../../../lib/gateway/ReportGateway');

const EventJobStatus = require('@barchart/events-api-common/lib/data/EventJobStatus');

module.exports = (() => {
	'use strict';

	const app = new Vue({
		el: '.wrapper',
		data: {
			selectedCustomer: '',
			selectedProduct: '',
			startTime: '',
			endTime: '',

			username: '',
			password: '',

			showAuth: true,

			message: '',

			reports: [ ],

			reportGateway: null,

			config: Config,
		},
		methods: {
			connect() {
				if (!this.username || !this.password) {
					return;
				}

				return ReportGateway.forStaging({ username: this.username, password: this.password })
					.then((gateway) => {
						this.reportGateway = gateway;

						this.showAuth = false;
					});
			},
			start() {
				if (!validateFields.call(this)) {
					this.message = 'Fill required fields';

					return;
				}

				this.message = 'Sending...';

				const filter = {
					customer: this.selectedCustomer,
				};

				if (this.selectedProduct) {
					filter.product = this.selectedProduct;
				}

				if (this.startTime) {
					filter.start = parseInt(this.startTime);
				}

				if (this.endTime) {
					filter.end = parseInt(this.endTime);
				}

				this.reportGateway.startReport(filter)
					.then((response) => {
						this.reports.push(format(response));

						this.message = response;
					}).catch((err) => {
						this.message = err;
					});
			},
			get(report) {
				if (report.status === EventJobStatus.RUNNING) {
					this.message = 'Sending...';

					return this.reportGateway.getReportAvailability(report.source)
						.then((response) => {
							const index = this.reports.findIndex(r => r.source === report.source);

							if (index >= 0) {
								this.reports[index] = format(response);
							}

							this.message = response;

							if (response.status === EventJobStatus.COMPLETE) {
								this.get(this.reports[index]);
							}
						})
						.catch((err) => {
							this.message = err;
						});
				} else if (report.status === EventJobStatus.COMPLETE) {
					return this.reportGateway.getReport(report.source)
						.then((response) => {
							const index = this.reports.findIndex(r => r.source === report.source);

							this.reports[index].link = response.link;

							this.message = `Report [ ${index + 1} ] is ready for download, click link (on left side of screen)`;
						});
				}
			},
			clear() {
				clear.call(this);
			},
		}
	});

	function format(response) {
		return {
			filter: response.filter,
			source: response.source,
			status: response.status,
		};
	}

	function clear() {
		this.reports = [ ];
		this.message = '';
	}

	function validateFields() {
		return !!this.selectedCustomer;
	}
})();