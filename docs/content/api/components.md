# Components

## Responses 

### ServerError :id=responsesservererror
> Server Error

**Content Type**: <code>application/json</code>

**Response Type:** <code><code>Array&lt;Object&gt;</code></code>

| Name | Type | Required | Nullable | Description |
| ---- | ---- | -------- | -------- | ----------- |
| value | <code>Object</code> | true | false |  |
| value.code | <code>String</code> | false | false | An error code. |
| value.message | <code>String</code> | false | false | An error message. |
| children | <code>Array</code> | true | false |  |

**Example**:

```json
[
  {
    "value": {
      "code": "REQUEST_GENERAL_FAILURE",
      "message": "An attempt to accept new events failed for unspecified reason(s)."
    },
    "children": []
  }
]
```

* * *

### Unauthorized :id=responsesunauthorized
> Authorization failure.

**Content Type**: <code>application/json</code>

**Response Type:** <code><code>Object</code></code>

| Name | Type | Required | Nullable | Description |
| ---- | ---- | -------- | -------- | ----------- |
| message | <code>String</code> | true | false | An error message. |

**Example**:

```json
{
  "message": "Unauthorized"
}
```

* * *

## Schemas 

### Event :id=schemasevent
**Type**: <code>Object</code>
    
| Name | Type | Required | Nullable | Description |
| ---- | ---- | -------- | -------- | ----------- |
| customer | <code>String</code> | true | false | A name of a customer. |
| product | <code>String</code> | true | false | A title of a product |
| type | <code>String</code> | true | false | An event type |
| timestamp | <code>Number</code> | true | false |  |
| context | <code>Array</code> | true | false | An array of context items. |
| context[i] | <code>String</code> | false | false |  |

**Example**:

```json
{
  "customer": "BARCHART",
  "product": "PORTFOLIO",
  "type": "PORTFOLIO-APPLICATION-LOADED",
  "timestamp": 1568381886060,
  "context": [
    "string"
  ]
}
```

* * *

### EventFull :id=schemaseventfull
**Type**: <code>Object</code>
    
| Name | Type | Required | Nullable | Description |
| ---- | ---- | -------- | -------- | ----------- |
| customer | <code>String</code> | true | false | A name of a customer. |
| product | <code>String</code> | true | false | A title of a product. |
| type | <code>String</code> | true | false | An event type |
| timestamp | <code>Number</code> | true | false |  |
| context | <code>Array</code> | true | false | An array of context items. |
| context[i] | <code>String</code> | false | false |  |
| sequence | <code>Number</code> | true | false |  |
| batch | <code>String</code> | true | false |  |

**Example**:

```json
{
  "customer": "BARCHART",
  "product": "PORTFOLIO",
  "type": "PORTFOLIO-APPLICATION-LOADED",
  "timestamp": 1568381886060,
  "context": [
    "string"
  ],
  "sequence": 1,
  "batch": "string"
}
```

* * *

### Filter :id=schemasfilter
**Type**: <code>Object</code>
    
| Name | Type | Required | Nullable | Description |
| ---- | ---- | -------- | -------- | ----------- |
| customer | <code>String</code> | true | false | A name of a customer. |
| product | <code>String</code> | true | false | A title of a product. |
| start | <code>String</code> | false | false | Start timestamp. |
| end | <code>String</code> | false | false | End timestamp. |

**Example**:

```json
{
  "customer": "BARCHART",
  "product": "PORTFOLIO",
  "start": 1571029200000,
  "end": 1571115600000
}
```

* * *

### Job :id=schemasjob
**Type**: <code>Object</code>
    
| Name | Type | Required | Nullable | Description |
| ---- | ---- | -------- | -------- | ----------- |
| job | <code>String</code> | true | false | A job uuid. |
| source | <code>String</code> | true | false | The identifier of the export job. |
| status | <code>String</code> | true | false | A status of the job. |
| filter | [<code>#/Components/schemas/filter</code>](#schemasFilter) | true | false |  |
| timing | <code>Object</code> | true | false |  |
| timing.day | <code>String</code> | false | false |  |
| timing.start | <code>Number</code> | false | false |  |

**Example**:

```json
{
  "job": "0527e342-c92c-45ec-a3cf-fd93f87cb068",
  "source": "JOB-0527e342-c92c-45ec-a3cf-fd93f87cb068",
  "status": "RUNNING",
  "filter": {
    "customer": "BARCHART",
    "product": "PORTFOLIO",
    "start": 1571029200000,
    "end": 1571115600000
  },
  "timing": {
    "day": "2020-09-10T15:59:30.198Z",
    "start": 1571073977278
  }
}
```

* * *

## Security 

### Basic :id=securitybasic

>

**Type**: http basic
    
#### Headers
| Name | Example |
| ---- | ------- |
| Authorization | Authorization: Basic <code>&lt;Token&gt;</code> |

* * *

