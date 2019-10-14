# @barchart/events-client-js
## A basic usage guide for generating reports

The Barchart Event Tracking System collects usage statistics from various software systems. This document will describe how to export data from the system, presumably for analysis by external tools (e.g. Tableua, Grafana, etc).

## API

The HTTP-based API exposes three simple operations:

* Start a new data export
* Check the status of a data export, and finally
* Download an export file, once completed.

### Semantics

The API accepts JSON formatted data in the body of HTTP requests. The API returns JSON data in HTTP responses.

### Security

The API will only communicate using the HTTPS protocol and it uses [basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) to validate your identity. Contact Barchart for your username and password.

### Public Host

The production host can be found here:

* events.aws.barchart.com

### Operations

#### Start New Export

Notifies the system to begin the generation of a new export file. This processing happens asynchronously. In other words, once you make the request, you will be provided with a unique identifier for the export job and it will begin processing in the background. You will need to check back periodically to see if the job has completed.

The export job will complete within 15 minutes. If too many records exist within the timeframe you've provided (_start_ to _end_), the job will fail and you will need to narrow your timeframe.

The following parameters are required:

* customer (required) - string - The name of the customer for which data is being exported. Barchart can provide you with the correct value.
* product (required) - string - The name of the product for which data is being exported. Barchart can provide you with a list of products which reports can be generated for.
* start (optional) - integer - The date and time of the first event to export. If provided, the value should be a millisecond-style [Unix time](https://en.wikipedia.org/wiki/Unix_time).
* end (optional) - integer - The data and time of the last event to export. If provided, the value should be a millisecond-style [Unix time](https://en.wikipedia.org/wiki/Unix_time).

_Endpoint_

https://events.aws.barchart.com/reports

_Verb_

POST

_Body_

JSON formatted data, here is an example:

`
{
	customer: 'BARCHART',
	product: 'PORTFOLIO',
	start: 1571029200000,
	end: 1571115600000
}
`

_cURL example_

	> curl --request POST https://events.aws.barchart.com/reports -H "Authorization: 'Basic {your-base-64-encoded-credentials}'" -d '{"filter": {"customer": "BARCHART", "product": "WATCHLIST", "start": 1570011173902}}

## JavaScript SDK


