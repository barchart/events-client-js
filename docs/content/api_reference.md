# API Reference

## Event API 1.3.0 {docsify-ignore}
    
> The Barchart Event Tracking System collects usage statistics from various software systems.

## OpenAPI Definition {docsify-ignore}

[Download](static/openapi.yaml)

## Contents {docsify-ignore}

* [Servers](#Servers)
* [Components](#Components)
* [Paths](#Paths)


## Servers {docsify-ignore}

* [https://events-stage.aws.barchart.com](https://events-stage.aws.barchart.com)  - Hostname for stage environment.
* [https://events.aws.barchart.com](https://events.aws.barchart.com)  - Hostname for production environment.

## Components {docsify-ignore}

### Responses 

* [ServerError](/content/api/components?id=responsesServerError)
* [Unauthorized](/content/api/components?id=responsesUnauthorized)

### Schemas 

* [Event](/content/api/components?id=schemasEvent)
* [EventFull](/content/api/components?id=schemasEventFull)
* [Filter](/content/api/components?id=schemasFilter)
* [Job](/content/api/components?id=schemasJob)

### Security 

* [Basic](/content/api/components?id=securityBasic)

## Paths {docsify-ignore}

* [POST /events](/content/api/paths?id=post-events)
* [POST /reports](/content/api/paths?id=post-reports)
* [GET /reports/{source}](/content/api/paths?id=get-reportssource)
* [GET /reports/{source}/availability](/content/api/paths?id=get-reportssourceavailability)
* [GET /system/version](/content/api/paths?id=get-systemversion)
