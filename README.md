# @barchart/events-client-js
## JavaScript library for interfacing with Barchart's Events API

## Documentation

The code is documented with [JSDoc](http://usejsdoc.org/). While the output hasn't been committed to source control, you can generate the documentation by using the following commands:

    > npm i jsdoc -g
    > gulp document

## Examples

### Browser

Two example pages exist. One allows you to send manually generate new events.events to server. The other allows you to trigger report generation, check report status, and download reports.

Open the example pages in a browser, from your local file system, here

- ./example/browser/example.event.html
- ./example/browser/example.report.html

Or, visit the hosted page at:

- [https://examples.aws.barchart.com/events-client-js/example.event.html](https://examples.aws.barchart.com/events-client-js/example.event.html)
- [https://examples.aws.barchart.com/events-client-js/example.report.html](https://examples.aws.barchart.com/events-client-js/example.report.html)

## Development

### Check linting

    > gulp lint

### Local Testing

Build the example pages manually:

    > gulp build-example-bundles

Alternately, a gulp task exists automatically rebuilds the example page bundle, as you make changes to the code:

    > gulp watch
