## Schema :id=schema
> <p>A meta namespace containing structural contracts of anonymous objects.</p>

**Kind**: global namespace  

* [Schema](#Schema) : <code>object</code>
    * _static_
        * [.Event](#SchemaEvent) : <code>Object</code>
        * [.ReportFilter](#SchemaReportFilter) : <code>Object</code>
        * [.ReportStatus](#SchemaReportStatus) : <code>Object</code>


* * *

### Schema.Event :id=schemaevent
> <p>Describes the occurrence of a single event. In other words, a usage statistic.</p>

**Kind**: static typedef of [<code>Schema</code>](#Schema)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| customer | <code>CustomerType</code> | <p>The customer using the software which generated the event.</p> |
| product | <code>ProductType</code> | <p>The software system which generated the event.</p> |
| type | <code>EventType</code> | <p>The type of event.</p> |
| timestamp | <code>Timestamp</code> | <p>The time of the event's occurrence.</p> |
| context | <code>Array.&lt;String&gt;</code> | <p>Additional data which is appropriate for the event's type.</p> |


* * *

### Schema.ReportFilter :id=schemareportfilter
> <p>Criteria used to filter events (i.e. usage statistics) for extraction to a
> report file.</p>

**Kind**: static typedef of [<code>Schema</code>](#Schema)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| customer | <code>CustomerType</code> | <p>The customer to extract events for.</p> |
| product | <code>ProductType</code> | <p>The software system to extract events for.</p> |
| [start] | <code>Timestamp</code> | <p>The time to begin extracting events.</p> |
| [end] | <code>Timestamp</code> | <p>The time to stop extracting events.</p> |


* * *

### Schema.ReportStatus :id=schemareportstatus
> <p>Describes the status (i.e. progress) of event extraction to a report file.</p>

**Kind**: static typedef of [<code>Schema</code>](#Schema)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| job | <code>String</code> | <p>The job's &quot;short&quot; identifier.</p> |
| source | <code>String</code> | <p>The job's identifier (used for must purposes).</p> |
| status | <code>EventJobStatus</code> | <p>Current status of report generation (e.g. running, complete, timeout, or failed).</p> |
| filter | [<code>ReportFilter</code>](#SchemaReportFilter) | <p>The criteria used for report generation.</p> |


* * *

