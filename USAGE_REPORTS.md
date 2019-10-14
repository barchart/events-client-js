# @barchart/events-client-js
## A basic usage guide for generating reports

The Barchart Event Tracking System collects usage statistics from various software systems. This document will describe how to export data from the system, presumably for analysis by external tools (e.g. Tableua, Grafana, etc).

## Export File Schema

Export files are pipe-delimited, plain text files which have a "csv" file extension. Inside the file, every row represents a discrete event. Different export files will have different columns, depending on the __product__ type the export is for.

__Common columns__

* [1] timestamp - number - The millisecond-style [Unix time](https://en.wikipedia.org/wiki/Unix_time) at which the event occurs.
* [2] type - type - A description of the event type. Different products track differetn events.

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

## Raw API

The HTTP-based API exposes three simple operations:

* [Start a new data export](#start-new-export),
* [Check the status of a data export](#check-export-status), and finally
* [Download an export file](#download-export), once completed.

### Semantics

The API accepts JSON formatted data in the body of HTTP requests. The API returns JSON data in HTTP responses.

### Security

The API will only communicate using the HTTPS protocol and it uses [basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) to validate your identity. Contact Barchart for your username and password. In other words, you should include an HTTP request header, as follows:

	Authorization: Basic {base64-endocde({username:password})}

### Public Host

The production host can be found here:

* events.aws.barchart.com

### Operations

#### Start New Export

__Overview__

Notifies the system to begin the generation of a new export file. This processing happens asynchronously. In other words, once you make the request, you will be provided with a unique identifier for the export job and it will begin processing in the background. You will need to check back periodically to see if the job has completed.

The following parameters are required:

* customer (required) - string - The name of the customer for which data is being exported. Barchart can provide you with the correct value.
* product (required) - string - The name of the product for which data is being exported. Barchart can provide you with a list of products which reports can be generated for.
* start (optional) - integer - The date and time of the first event to export. If provided, the value should be a millisecond-style [Unix time](https://en.wikipedia.org/wiki/Unix_time).
* end (optional) - integer - The data and time of the last event to export. If provided, the value should be a millisecond-style [Unix time](https://en.wikipedia.org/wiki/Unix_time).

The export job will complete within 15 minutes. If too many records exist and the report cannot be compiled within 15 minutes, it will time out. If that happens, narrow your timeframe and retry.

__Endpoint__

https://events.aws.barchart.com/reports

__Verb__

Use an HTTP POST with this endpoint. The request body should be a "stringified" JSON document. Here is an example document:

	{
		customer: 'BARCHART',
		product: 'PORTFOLIO',
		start: 1571029200000,
		end: 1571115600000
	}

__Response__

A JSON document will be returned, which contains the following important properties:

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
		"timing":{
			day: "2019-10-14",
			start: 1571073977278
		}
	}


__cURL example__

	> curl --request POST https://events.aws.barchart.com/reports -H "Authorization: 'Basic {base-64-encoded-credentials-separated-by-a-colon}'" -d '{"filter": {"customer": "BARCHART", "product": "WATCHLIST", "start": 1570011173902}}'

#### Check Export Status

__Overview__

Once you have [started an export]((#start-new-export), you will need to check it's status before attempting to download.

The following parameters are required:

* source (required) - string - The identifier of the export job.

__Endpoint__

https://events.aws.barchart.com/{source}/availability

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

As soon as the export is complete, this endpoint can be used to download the report (or get a link to the report for downloading at a later time).

The following parameters are required:

* source (required) - string - The identifier of the export job.

__Endpoint__

https://events.aws.barchart.com/{source}

__Verb__

GET

__Response__

If a "content-type" header is included in your request, you will receive a JSON document, which contains the following important properties:

* link - string - A secure URL that can be used to download the export file. This link expires after a few minutes, so use it quickly.

Here is an example:

{
	"link":"https://barchart-event-job.s3.amazonaws.com/..."
}

__cURL example__

	> curl --request GET https://events.aws.barchart.com/reports/JOB-96d3d9d2-308a-43c7-aa74-ec00dc2106d8/availability -H "Authorization: 'Basic {base-64-encoded-credentials-separated-by-a-colon}'"

Alternately, if you omit the "content-type" header, you will receive an HTTP 302 response, redirecting you to the download link.



## JavaScript SDK


