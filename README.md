# @barchart/events-client-js

[![AWS CodeBuild](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiWjFXSGlEVFZMU2Y4WWlXZld6ZEpCMXdMbStRWjlLNGxmazZHcFl2dUJqM3ZaYURwVzdXQlprUWtPN1p5WjRsS21jcmZ0Z25mUHlEd2dRYVVycVVheE1ZPSIsIml2UGFyYW1ldGVyU3BlYyI6IllkejNzc2FnMHlac2h0VjkiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)](https://github.com/barchart/events-client-js)

A **public** JavaScript SDK for interfacing with Barchart's Event Tracking System

## Overview

The Barchart Event Tracking System collects usage statistics from various software systems and exposes the following functionality:

- Accepts and **saves events** (e.g. Job Started, Pizza Ordered, Lightning Struck, etc).
- Accepts requests to **generate log files** containing events, given a customer, product type, and optional start and end dates.

This SDK simplifies interaction with the Barchart Event Tracking System, by exposing JavaScript classes with simple functions:

- EventGateway.sendEvents (sends a new event(s) to the backend),
- ReportGateway.startReport (triggers generation of a new report),
- ReportGateway.getReportAvailability (checks progress of report generation), and
- ReportGateway.getReport (gets the download link for a completed report)

Also, two utilities exist:

- EventBatcher (Wraps an EventGateway, temporarily caching new events before sending them to the backend), and
- EventFactory (Simplifies creation of event objects)

## Documentation

The code is documented with [JSDoc](http://usejsdoc.org/). This will be used as the basis for formal documentation (coming soon).

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

#### Package Managers

This library has been published as a *public* module to NPM as [@barchart/events-client-js](https://www.npmjs.com/package/@barchart/events-client-js).

```shell
npm install @barchart/events-client-js -S
```

#### Build

Modern JavaScript language features are used. Some browsers may still require polyfills.

#### License

This software is provided under the MIT license.