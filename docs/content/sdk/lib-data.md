## Schema :id=schema
> <p>A meta namespace containing structural contracts of anonymous objects.</p>

**Kind**: global namespace  

* * *

### Schema.Event :id=schemaevent
> <p>An event.</p>

**Kind**: static typedef of [<code>Schema</code>](#Schema)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| customer | <code>CustomerType</code> | <p>The customer using the software which generated the event.</p> |
| product | <code>ProductType</code> | <p>The software system which generated the event.</p> |
| type | <code>EventType</code> | <p>The type of event.</p> |
| timestamp | <code>Number</code> | <p>The time of the event's occurrence.</p> |
| context | <code>Array.&lt;String&gt;</code> | <p>Additional data which is appropriate for the event's type.</p> |


* * *

