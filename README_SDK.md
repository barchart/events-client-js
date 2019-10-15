# @barchart/events-client-js
## A usage guide for generating reports (using this SDK)

The Barchart Event Tracking System collects usage statistics from various software systems. This document will describe how to export data from the system, presumably for analysis by external tools (e.g. Tableua, Grafana, etc) using the HTTP API directly.

## Alternatives

### JavaScript SDK

This JavaScript API handles HTTP-based interactions with the backend. If you would prefer, you can interact with the backend directly. The readme file for the raw HTTP API can be found [here](https://github.com/barchart/events-client-js/blob/master/README_API.md).

## Object Model

### ReportGateway

#### Instantiate

This class allows you to access API functions through a promise-based interface. Instantiate a new ReportGateway as follows:

~~~~
const ReportGateway = require('@barchart/events-client-js/lib/gateway/ReportGateway');

const credentials = { };
credentials.username = 'your-username'; // Ask Barchart
credentials.password = 'your-password'; // Ask Barchart

const reportGateway = ReportGateway.forProduction(credentials)
	.then(() -> {
		// ready to use...
	});
~~~~

#### Start New Export

You can start a new export, as follows:

`
const unixNow = (new Date()).getTime();
const unixTwentyFourHoursAgo = unixNow - (24 * 60 * 60 * 1000);

const filter = { };

filter.customer = 'YOUR-CUSTOMER-ID'; // Ask Barchart
filter.product = 'YOUR-DESIRED-PRODUCT' // Ask Barchart
filter.start = unixTwentyFourHoursAgo; // Optional, but recommended
filter.end = unixNow // Optional, but recommended

let jobId;

reportGateway.startReport(filter)
	.then((jobData) => {
		// Report has started.

		jobId = jobData.source;
	}).catch((error) => {
		// Problem sending report or backend failed to start job. Unlikely.
	})
`

#### Check Export Status

After a job has been started, using the [startReport](#start-report) function, it will run for up to fifteen minutes. During that time, you can check the status of the job, as follows:

`
const EventJobStatus = require('@barchart/events-api-common/lib/data/EventJobStatus');

reportGateway.getReportAvailability(jobId)
	.then((jobData) => {
		if (jobData.status === EventJobStatus.RUNNING) {
			// Still running, check back again.
		} else if (jobData.status === EventJobStatus.COMPLETE) {
			// Ready for download.
		} else if (jobData.status === EventJobStatus.TIMEOUT) {
			// Job did not complete within allotted time. Too many records in your filter's date
			// range. Start a new job, narrowing your date range.
		} else if (jobData.status === EventJobStatus.FAILED) {
			// Other problem, should not happen.
		}
	}).catch((e) => {
		// Failed to retrieve status. Job might not exist. Unlikely.
	});
`

#### Download Export

Once the job's status is `EventJobStatus.COMPLETE`, you can retrieve a link to download the export file, as follows:

`
reportGateway.getReport(jobId)
	.then((downloadData) => {
		const url = downloadData.link;

		// Now you can download the file (using your own or even anchor tag in the HTML document).
	}).catch((e) => {
		// Failed to retrieve download link. Maybe the report hasn't completed yet. Unlikely.
	});
`



