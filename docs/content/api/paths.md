# Paths

## POST /events 

> Accepts new events, adds them to SQS for async ingestion

**Summary**: Create events.

#### Request Body
    
**Content Type**: application/json

**Type**: [<code>Array&lt;Event&gt;</code>](/content/api/components?id=schemasEvent)

**Example**:

```json
[
  {
    "customer": "BARCHART",
    "product": "PORTFOLIO",
    "type": "PORTFOLIO-APPLICATION-LOADED",
    "timestamp": 1568381886060,
    "context": [
      "string"
    ]
  }
]
```

#### Responses

**Status Code**: 200

> The array of newly created events.

**Content Type**: <code>application/json</code>

**Response Type:** [<code>Array&lt;Eventfull&gt;</code>](/content/api/components?id=schemasEventFull)

* * *

**Status Code**: 500 - [ServerError](/content/api/components?id&#x3D;responsesservererror)

* * *

## POST /reports 

> Notifies the system to begin generation of a new export file. This processing happens asynchronously. In other words, once you make the request, report processing will begin and receive an immediate response with the identifier for the job that&#x27;s in progress. You will need to check back periodically to determine if the job has completed.

**Summary**: Start Report

**Security**: 
[Basic](/content/api/components?id=securityBasic)
#### Request Body
    
**Content Type**: application/json

**Type**: <code>Object</code>

| Name | Type | Required | Nullable | Description |
| ---- | ---- | -------- | -------- | ----------- |
| filter | [<code>Filter</code>](/content/api/components?id=schemasFilter) |  | false |  |

**Example**:

```json
{
  "filter": {
    "customer": "BARCHART",
    "product": "PORTFOLIO",
    "start": 1571029200000,
    "end": 1571115600000
  }
}
```

#### Responses

**Status Code**: 200

> A JSON object of the job.

**Content Type**: <code>application/json</code>

**Response Type:** [<code>Array&lt;Job&gt;</code>](/content/api/components?id=schemasJob)

* * *

**Status Code**: 401 - [Unauthorized](/content/api/components?id&#x3D;responsesunauthorized)

* * *

**Status Code**: 500 - [ServerError](/content/api/components?id&#x3D;responsesservererror)

* * *

## GET /reports/{source} 

> Download the report.

**Summary**: Download Report

**Security**: 
[Basic](/content/api/components?id=securityBasic)
#### Headers

| Name | Type | Required | Nullable | Description |
| ---- | ---- | -------- | -------- | ----------- |
| Accept | <code>String</code> | false | false | The Accept request-header field can be used to specify certain media types which are acceptable for the response. |

#### Path Parameters

| Name | Type | Required | Nullable | Description |
| ---- | ---- | -------- | -------- | ----------- |
| source | <code>String</code> | true | false | The identifier of the export job. |

#### Responses

**Status Code**: 200

> Link to the report.

**Content Type**: <code>application/json</code>

**Response Type:** <code>Object</code>
    
| Name | Type | Required | Nullable | Description |
| ---- | ---- | -------- | -------- | ----------- |
| link | <code>String</code> | false | false |  |

**Example**:

```json
{
  "link": "https://.../file.csv"
}
```

* * *

**Status Code**: 401 - [Unauthorized](/content/api/components?id&#x3D;responsesunauthorized)

* * *

**Status Code**: 500 - [ServerError](/content/api/components?id&#x3D;responsesservererror)

* * *

## GET /reports/{source}/availability 

> Once you have started an export, you will need to check its status (before attempting a download).

**Summary**: Check Export Status

#### Path Parameters

| Name | Type | Required | Nullable | Description |
| ---- | ---- | -------- | -------- | ----------- |
| source | <code>String</code> | true | false | The identifier of the export job. |

#### Responses

**Status Code**: 200

> Job object.

**Content Type**: <code>application/json</code>

**Response Type:** [<code>Array&lt;Job&gt;</code>](/content/api/components?id=schemasJob)

* * *

**Status Code**: 401 - [Unauthorized](/content/api/components?id&#x3D;responsesunauthorized)

* * *

**Status Code**: 500 - [ServerError](/content/api/components?id&#x3D;responsesservererror)

* * *

## GET /system/version 

> Returns current application version

**Summary**: Get Version.

**Security**: 
[Basic](/content/api/components?id=securityBasic)
#### Responses

**Status Code**: 200

> Version of the API.

**Content Type**: <code>application/json</code>

**Response Type:** <code>Object</code>
    
| Name | Type | Required | Nullable | Description |
| ---- | ---- | -------- | -------- | ----------- |
| version | <code>String</code> | false | false |  |

**Example**:

```json
{
  "version": "1.3.0"
}
```

* * *

**Status Code**: 401 - [Unauthorized](/content/api/components?id&#x3D;responsesunauthorized)

* * *

