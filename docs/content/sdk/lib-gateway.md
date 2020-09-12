## Contents {docsify-ignore}

* [EventGateway](#EventGateway) 

* [ReportGateway](#ReportGateway) 


* * *

## EventGateway :id=eventgateway
> <p>A <strong>central component of the SDK</strong> which is responsible for sending events (i.e. usage
> statistics to the backend).</p>

**Kind**: global class  
**Extends**: <code>Disposable</code>  
**Access**: public  

* [EventGateway](#EventGateway) ⇐ <code>Disposable</code>
    * _instance_
        * [.start()](#EventGatewaystart) ⇒ [<code>Promise.&lt;EventGateway&gt;</code>](#EventGateway)
        * [.createEvents(events)](#EventGatewaycreateEvents) ⇒ [<code>Promise.&lt;Array.&lt;Schema.Event&gt;&gt;</code>](/content/sdk/lib-data?id=schemaevent)
    * _static_
        * [.for(stage)](#EventGatewayfor) ⇒ [<code>Promise.&lt;EventGateway&gt;</code>](#EventGateway) \| <code>Promise.&lt;null&gt;</code>
        * [.forDevelopment()](#EventGatewayforDevelopment) ⇒ [<code>Promise.&lt;EventGateway&gt;</code>](#EventGateway)
        * [.forStaging()](#EventGatewayforStaging) ⇒ [<code>Promise.&lt;EventGateway&gt;</code>](#EventGateway)
        * [.forProduction()](#EventGatewayforProduction) ⇒ [<code>Promise.&lt;EventGateway&gt;</code>](#EventGateway)
    * _constructor_
        * [new EventGateway(protocol, host, port)](#new_EventGateway_new)


* * *

### eventGateway.start() :id=eventgatewaystart
> <p>Initializes the connection to the remote server and returns a promise
> containing the current instance.</p>

**Kind**: instance method of [<code>EventGateway</code>](#EventGateway)  
**Returns**: [<code>Promise.&lt;EventGateway&gt;</code>](#EventGateway)  
**Access**: public  

* * *

### eventGateway.createEvents(events) :id=eventgatewaycreateevents
> <p>Saves one (or many) events.</p>

**Kind**: instance method of [<code>EventGateway</code>](#EventGateway)  
**Returns**: [<code>Promise.&lt;Array.&lt;Schema.Event&gt;&gt;</code>](/content/sdk/lib-data?id=schemaevent)  
**Access**: public  

| Param | Type |
| --- | --- |
| events | [<code>Array.&lt;Schema.Event&gt;</code>](/content/sdk/lib-data?id=schemaevent) | 


* * *

### EventGateway.for(stage) :id=eventgatewayfor
> <p>Creates and starts a new [EventGateway](/content/sdk/lib-gateway?id=eventgateway) for an environment.</p>

**Kind**: static method of [<code>EventGateway</code>](#EventGateway)  
**Returns**: [<code>Promise.&lt;EventGateway&gt;</code>](#EventGateway) \| <code>Promise.&lt;null&gt;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| stage | <code>String</code> | 


* * *

### EventGateway.forDevelopment() :id=eventgatewayfordevelopment
> <p>Creates and starts a new [EventGateway](/content/sdk/lib-gateway?id=eventgateway) for the development environment.</p>

**Kind**: static method of [<code>EventGateway</code>](#EventGateway)  
**Returns**: [<code>Promise.&lt;EventGateway&gt;</code>](#EventGateway)  
**Access**: public  

* * *

### EventGateway.forStaging() :id=eventgatewayforstaging
> <p>Creates and starts a new [EventGateway](/content/sdk/lib-gateway?id=eventgateway) for the staging environment.</p>

**Kind**: static method of [<code>EventGateway</code>](#EventGateway)  
**Returns**: [<code>Promise.&lt;EventGateway&gt;</code>](#EventGateway)  
**Access**: public  

* * *

### EventGateway.forProduction() :id=eventgatewayforproduction
> <p>Creates and starts a new [EventGateway](/content/sdk/lib-gateway?id=eventgateway) for the production environment.</p>

**Kind**: static method of [<code>EventGateway</code>](#EventGateway)  
**Returns**: [<code>Promise.&lt;EventGateway&gt;</code>](#EventGateway)  
**Access**: public  

* * *

### new EventGateway(protocol, host, port) :id=new_eventgateway_new
**Kind**: constructor of [<code>EventGateway</code>](#EventGateway)  

| Param | Type | Description |
| --- | --- | --- |
| protocol | <code>String</code> | <p>The protocol to use (either HTTP or HTTPS).</p> |
| host | <code>String</code> | <p>The host name of the Events web service.</p> |
| port | <code>Number</code> | <p>The TCP port number of the Events web service.</p> |


* * *

## ReportGateway :id=reportgateway
> <p>A <strong>central component of the SDK</strong> which is responsible for requesting a new
> usage statistic report, checking on report progress, and downloading the
> report when completed.</p>

**Kind**: global class  
**Extends**: <code>Disposable</code>  
**Access**: public  

* [ReportGateway](#ReportGateway) ⇐ <code>Disposable</code>
    * _instance_
        * [.start()](#ReportGatewaystart) ⇒ [<code>Promise.&lt;ReportGateway&gt;</code>](#ReportGateway)
        * [.startReport(filter)](#ReportGatewaystartReport) ⇒ [<code>Promise.&lt;Schema.ReportStatus&gt;</code>](/content/sdk/lib-data?id=schemareportstatus)
        * [.getReportAvailability(source)](#ReportGatewaygetReportAvailability) ⇒ [<code>Promise.&lt;Schema.ReportStatus&gt;</code>](/content/sdk/lib-data?id=schemareportstatus)
        * [.getReport(source)](#ReportGatewaygetReport) ⇒ <code>Promise.&lt;ReportDownloadLink&gt;</code>
        * [.getVersion()](#ReportGatewaygetVersion) ⇒ <code>Promise.&lt;ServiceMetadata&gt;</code>
    * _static_
        * [.for(stage, credentials)](#ReportGatewayfor) ⇒ <code>Promise.&lt;(ReportGateway\|null)&gt;</code>
        * [.forStaging(credentials)](#ReportGatewayforStaging) ⇒ [<code>Promise.&lt;ReportGateway&gt;</code>](#ReportGateway)
        * [.forProduction(credentials)](#ReportGatewayforProduction) ⇒ [<code>Promise.&lt;ReportGateway&gt;</code>](#ReportGateway)
    * _constructor_
        * [new ReportGateway(protocol, host, port, credentials)](#new_ReportGateway_new)


* * *

### reportGateway.start() :id=reportgatewaystart
> <p>Initializes the connection to the remote server and returns a promise
> containing the current instance.</p>

**Kind**: instance method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: [<code>Promise.&lt;ReportGateway&gt;</code>](#ReportGateway)  
**Access**: public  

* * *

### reportGateway.startReport(filter) :id=reportgatewaystartreport
> <p>Starts a report.</p>

**Kind**: instance method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: [<code>Promise.&lt;Schema.ReportStatus&gt;</code>](/content/sdk/lib-data?id=schemareportstatus)  
**Access**: public  

| Param | Type |
| --- | --- |
| filter | [<code>Schema.ReportFilter</code>](/content/sdk/lib-data?id=schemareportfilter) | 


* * *

### reportGateway.getReportAvailability(source) :id=reportgatewaygetreportavailability
> <p>Returns data regarding the status of a report (i.e. running, finished, etc).</p>

**Kind**: instance method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: [<code>Promise.&lt;Schema.ReportStatus&gt;</code>](/content/sdk/lib-data?id=schemareportstatus)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>String</code> | <p>The &quot;source&quot; identifier for the report.</p> |


* * *

### reportGateway.getReport(source) :id=reportgatewaygetreport
> <p>Assuming the report has completed, gets a link which can be used to
> download the actual report in CSV format.</p>

**Kind**: instance method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: <code>Promise.&lt;ReportDownloadLink&gt;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>String</code> | <p>The &quot;source&quot; identifier for the report.</p> |


* * *

### reportGateway.getVersion() :id=reportgatewaygetversion
> <p>Returns the version of the remote service.</p>

**Kind**: instance method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: <code>Promise.&lt;ServiceMetadata&gt;</code>  
**Access**: public  

* * *

### ReportGateway.for(stage, credentials) :id=reportgatewayfor
> <p>Creates and starts a new [ReportGateway](/content/sdk/lib-gateway?id=reportgateway) for an environment.</p>

**Kind**: static method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: <code>Promise.&lt;(ReportGateway\|null)&gt;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| stage | <code>String</code> | 
| credentials | [<code>Schema.ReportCredentials</code>](/content/sdk/lib-data?id=schemareportcredentials) | 


* * *

### ReportGateway.forStaging(credentials) :id=reportgatewayforstaging
> <p>Creates and starts a new [ReportGateway](/content/sdk/lib-gateway?id=reportgateway) for the staging environment.</p>

**Kind**: static method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: [<code>Promise.&lt;ReportGateway&gt;</code>](#ReportGateway)  
**Access**: public  

| Param | Type |
| --- | --- |
| credentials | [<code>Schema.ReportCredentials</code>](/content/sdk/lib-data?id=schemareportcredentials) | 


* * *

### ReportGateway.forProduction(credentials) :id=reportgatewayforproduction
> <p>Creates and starts a new [ReportGateway](/content/sdk/lib-gateway?id=reportgateway) for the production environment.</p>

**Kind**: static method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: [<code>Promise.&lt;ReportGateway&gt;</code>](#ReportGateway)  
**Access**: public  

| Param | Type |
| --- | --- |
| credentials | [<code>Schema.ReportCredentials</code>](/content/sdk/lib-data?id=schemareportcredentials) | 


* * *

### new ReportGateway(protocol, host, port, credentials) :id=new_reportgateway_new
**Kind**: constructor of [<code>ReportGateway</code>](#ReportGateway)  

| Param | Type | Description |
| --- | --- | --- |
| protocol | <code>String</code> | <p>The protocol to use (either HTTP or HTTPS).</p> |
| host | <code>String</code> | <p>The host name of the Events web service.</p> |
| port | <code>Number</code> | <p>The TCP port number of the Events web service.</p> |
| credentials | [<code>Schema.ReportCredentials</code>](/content/sdk/lib-data?id=schemareportcredentials) | <p>The credentials for authenticate.</p> |


* * *

