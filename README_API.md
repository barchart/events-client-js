# @barchart/events-client-js
## A usage guide for generating reports (using the API directly)

The Barchart Event Tracking System collects usage statistics from various software systems. This document will describe how to export data from the system, presumably for analysis by external tools (e.g. Tableua, Grafana, etc) using the HTTP API directly.

## Alternatives

### JavaScript SDK

If you prefer not to use the HTTP API directly, a JavaScript SDK exists which simplifies interaction with the backend. It exposes promise-based functions and handles the details of HTTP interactions with the backend. The readme file for the SDK can be found [here](https://github.com/barchart/events-client-js/blob/master/README_SDK.md).

## Export File Schema

Export files are pipe-delimited, plain text files which have "csv" file extensions. Inside the file, every row represents a discrete event. Export files for different __product__ types have slightly different definitions.

__Common columns__

* [1] timestamp - The millisecond-style [Unix time](https://en.wikipedia.org/wiki/Unix_time) at which the event occurred.
* [2] type - A description of the event type (e.g. WATCHLIST-CREATED or PORTFOLIO-DELETED).

__Additional columns (by product)__

WATCHLIST:

* [3] userId - The identifier of the user who triggered the event.
* [4] watchlistId - The identifier of the watchlist which was affected by the event.
* [5] symbol - The symbol which the event pertains to.
* [6] viewName - The name of the watchlist view which the event pertains to.
* [7] viewType - The type of watchlist view which the event pertains to.
* [8] dataMode - The data mode which the event pertains to.
* [9] classFilter - The asset class the event pertains to.

PORTFOLIO:

* [3] userId - The identifier of the user who triggered the event.
* [4] portfolioId - The identifier of the portfolio which was affected by the event.
* [5] positionId - The identifier of the position which was affected by the event.
* [6] frame - The time "frame" of the position which was affected by the event.
* [7] viewName - The name of the portfolio view which the event pertains to.
* [8] showClosedPositions - Indicates the state of "show closed positions" checkbox related to the event.
* [9] dividendStrategy - Indicates "dividend strategy" associated with the event.
* [10] cashAdjustmentStrategy - Indicates "cash adjustment" strategy associated with the event.

## API

The HTTP-based API exposes three simple operations:

* [Start a new data export](#start-new-export),
* [Check the status of a data export](#check-export-status), and finally
* [Download an export file](#download-export), once completed.

### Semantics

The API accepts JSON formatted data in the body of HTTP requests and returns JSON data in HTTP responses.

### Security

The API will only communicate over the HTTPS protocol.

It uses [basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) to validate your identity. Contact Barchart for your username and password.

Your HTTP request header should include the following:

	Authorization: Basic {base64-endocde({username:password})}

### Security (Example)

Assume the following:

* Username: bryan
* Password: green-eggs-and-spam

First, combine the username and password, separating them with a colon, as follows:

* bryan:green-eggs-and-spam

Then, base64 encode the entire string, yielding the following output:

* YnJ5YW46Z3JlZW4tZWdncy1hbmQtc3BhbQ==

Finally, include this encoded string in your HTTP request, as an Authorization header, as follows:

* Authorization: Basic YnJ5YW46Z3JlZW4tZWdncy1hbmQtc3BhbQ==

### Public Host

The production environment can be accessed at:

* events.aws.barchart.com

### Operations

#### Start New Export

__Overview__

Notifies the system to begin generation of a new export file. This processing happens asynchronously. In other words, once you make the request, report processing will begin and receive an immediate response with the identifier for the job that's in progress. You will need to check back periodically to determine if the job has completed.

The following parameters are required:

* customer (required) - string - The name of the customer for which data is being exported. Barchart can provide your customer name.
* product (required) - string - The name of the product for which data is being exported. Barchart can provide you with a list of products.
* start (optional) - integer - The date and time of the first event to export. If provided, the value should be a millisecond-style [Unix time](https://en.wikipedia.org/wiki/Unix_time).
* end (optional) - integer - The data and time of the last event to export. If provided, the value should be a millisecond-style [Unix time](https://en.wikipedia.org/wiki/Unix_time).

The export job will complete within 15 minutes. If too many records exist and the report cannot be compiled within 15 minutes, report generation will time out. If that happens, narrow your timeframe and retry.

__Endpoint__

https://events.aws.barchart.com/reports

__Verb__

POST

__Body__

The request body should be a "stringified" JSON document. Here is an example document:

	{
		customer: 'BARCHART',
		product: 'PORTFOLIO',
		start: 1571029200000,
		end: 1571115600000
	}

__Response__

A JSON document will be returned which contains the following important properties:

* source - string - The unique identifier of export job.
* status - string - One of the following: { RUNNING, COMPLETED, TIMEOUT, FAILED }.

Here is an example:

	{
		job: "0527e342-c92c-45ec-a3cf-fd93f87cb068",
		source: "JOB-0527e342-c92c-45ec-a3cf-fd93f87cb068",
		status:"RUNNING",
		filter: {
			customer: "BARCHART",
			product: "PORTFOLIO"
		},
		timing: {
			day: "2019-10-14",
			start: 1571073977278
		}
	}


__cURL example__

	> curl --request POST https://events.aws.barchart.com/reports -H "Authorization: 'Basic {base-64-encoded-credentials-separated-by-a-colon}'" -d '{"filter": {"customer": "BARCHART", "product": "WATCHLIST", "start": 1570011173902}}'

#### Check Export Status

__Overview__

Once you have [started an export](#start-new-export), you will need to check its status (before attempting a download).

The following parameters are required:

* source (required) - string - The identifier of the export job.

__Endpoint__

https://events.aws.barchart.com/reports/{source}/availability

__Verb__

GET

__Response__

A JSON document will be returned, which contains the following important properties:

* status - string - One of the following { RUNNING, COMPLETED, TIMEOUT, FAILED }

Here is an example:

	{
		job: "96d3d9d2-308a-43c7-aa74-ec00dc2106d8",
		source: "JOB-96d3d9d2-308a-43c7-aa74-ec00dc2106d8",
		status: "COMPLETE",
		filter: {
			customer: "BARCHART",
			product: "WATCHLIST",
			start: 1571029200000
		},
		timing: {
			day: "2019-10-14",
			start: 1571078514202,
			end: 1571078528233
		}
	}

__cURL example__

	> curl --request GET https://events.aws.barchart.com/reports/JOB-96d3d9d2-308a-43c7-aa74-ec00dc2106d8/availability -H "Authorization: 'Basic {base-64-encoded-credentials-separated-by-a-colon}'"

#### Download Export

__Overview__

As soon as the export is complete, you can download the report (or get a link to the report for downloading the report later).

The following parameters are required:

* source (required) - string - The identifier of the export job.

__Endpoint__

https://events.aws.barchart.com/reports/{source}

__Verb__

GET

__Response__

If an "Accept" header for "application/json" is included in your request, you will receive a JSON document, which contains the following important properties:

* link - string - A secure URL that can be used to download the export file. This link expires after a few minutes, so use it quickly.

Here is an example:

	{
		link: "https://barchart-event-job.s3.amazonaws.com/..."
	}

__cURL example__

	> curl --request GET https://events.aws.barchart.com/reports/JOB-96d3d9d2-308a-43c7-aa74-ec00dc2106d8 -H "Authorization: 'Basic {base-64-encoded-credentials-separated-by-a-colon}'" -H "Accept: application/json"

Alternately, if you omit the "Accept" header, you will receive an HTTP 302 response, redirecting you to the download link.


