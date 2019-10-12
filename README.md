# @barchart/events-client-js
## JavaScript library for interfacing with Barchart's Events API

The Barchart Events System accepts HTTP requests, offering the following functionality:

- Accepts and _saves events_ (e.g. Job Started, Pizza Ordered, Lightning Struck, etc).
- Accepts _requests to generate log files_ containing events, given a customer, product type, and optional start and end dates.

This library simplifies interaction with the Barchart Events System, by exposing JavaScript classes with simple functions like:

- EventGateway.sendEvents (sends a new event(s) to the backend),
- ReportGateway.startReport (triggers generation of a new report),
- ReportGateway.getReportAvailability (checks progress of report generation), and
- ReportGateway.getReport (gets the download link for a completed report)

Also, two utilities exist:

- EventBatcher (Wraps an EventGateway, temporarily caching new events before sending them to the backend), and
- EventFactory (Simplifies creation of event objects)

_Use of this client is optional, you may interact with the backend directly via HTTP requests_


## Documentation

## Code

The code is documented with [JSDoc](http://usejsdoc.org/). While the output hasn't been committed to source control, you can generate the documentation by using the following commands:

    > npm i jsdoc -g
    > gulp document

## Examples

### Usage Guide

The following usage guide details report generation using this library or direct HTTP request (with cURL examples).

### Browser

Two example pages exist. One allows you to send manually generate new events.events to server. The other allows you to trigger report generation, check report status, and download reports.

Open the example pages in a browser, from your local file system, here

- ./example/browser/example.event.html
- ./example/browser/example.report.html

Or, visit the hosted page at:

- [https://examples.aws.barchart.com/events-client-js/example.event.html](https://examples.aws.barchart.com/events-client-js/example.event.html)
- [https://examples.aws.barchart.com/events-client-js/example.report.html](https://examples.aws.barchart.com/events-client-js/example.report.html)

## Development

### Check for Lint

    > gulp lint

### Local Testing

Build the example pages manually:

    > gulp build-example-bundles

Alternately, a gulp task exists automatically rebuilds the example page bundle, as you make changes to the code:

    > gulp watch
