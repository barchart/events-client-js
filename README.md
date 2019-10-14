# @barchart/events-client-js
## JavaScript SDK for interfacing with Barchart's Event Tracking System

The Barchart Event Tracking System collects usage statistics from various software systems and exposes the following functionality:

- Accepts and _saves events_ (e.g. Job Started, Pizza Ordered, Lightning Struck, etc).
- Accepts _requests to generate log files_ containing events, given a customer, product type, and optional start and end dates.

This SDK simplifies interaction with the Barchart Event Tracking System, by exposing JavaScript classes with simple functions:

- EventGateway.sendEvents (sends a new event(s) to the backend),
- ReportGateway.startReport (triggers generation of a new report),
- ReportGateway.getReportAvailability (checks progress of report generation), and
- ReportGateway.getReport (gets the download link for a completed report)

Also, two utilities exist:

- EventBatcher (Wraps an EventGateway, temporarily caching new events before sending them to the backend), and
- EventFactory (Simplifies creation of event objects)

## Examples

### SDK Usage

A step-by-step guide for using the SDK can be found here: [README_SDK.md](https://github.com/barchart/events-client-js/blob/master/README_SDK.md).

### Direct API Access

You can interact with the Barchart Event Tracking System without using this SDK. The documentation for the API can be found here: [README_API.md](https://github.com/barchart/events-client-js/blob/master/README_API.md).

### Browser Test Client

Two example pages exist. One allows you to send manually generated events the backend. The other allows you to trigger report generation, check report status, and download reports. Please note, these clients are attached to the _staging_ environment (not the production environment).

Load the examples from your local file system, here:

- ./example/browser/example.event.html
- ./example/browser/example.report.html

Or, visit the hosted page at:

- [https://examples.aws.barchart.com/events-client-js/example.event.html](https://examples.aws.barchart.com/events-client-js/example.event.html)
- [https://examples.aws.barchart.com/events-client-js/example.report.html](https://examples.aws.barchart.com/events-client-js/example.report.html)

## Development

### Code Documentation

The code is documented with [JSDoc](http://usejsdoc.org/). While the output hasn't been committed to source control, you can generate the documentation by using the following commands:

    > npm i jsdoc -g
    > gulp document

### Check for Lint

    > gulp lint

### Local Testing

Build the example pages manually:

    > gulp build-example-bundles

Alternately, a gulp task exists automatically rebuilds the example page bundle, as you make changes to the code:

    > gulp watch
