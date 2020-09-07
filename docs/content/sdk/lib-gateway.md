## Contents {docsify-ignore}

* [EventGateway](#EventGateway) 

* [ReportGateway](#ReportGateway) 


* * *

## EventGateway :id=eventgateway
> <p>Web service gateway for invoking the Events API.</p>

**Kind**: global class  
**Extends**: <code>Disposable</code>  
**Access**: public  

* [EventGateway](#EventGateway) ⇐ <code>Disposable</code>
    * _instance_
        * [.start()](#EventGatewaystart) ⇒ [<code>Promise.&lt;EventGateway&gt;</code>](#EventGateway)
        * [.createEvents(events)](#EventGatewaycreateEvents) ⇒ <code>Promise.&lt;Array.&lt;Events&gt;&gt;</code>
    * _static_
        * [.for(stage)](#EventGatewayfor) ⇒ <code>Promise.&lt;(EventGateway\|null)&gt;</code>
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
> <p>Creates an events.</p>

**Kind**: instance method of [<code>EventGateway</code>](#EventGateway)  
**Returns**: <code>Promise.&lt;Array.&lt;Events&gt;&gt;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| events | [<code>Array.&lt;Event&gt;</code>](/content/sdk/lib-engine?id=event) | 


* * *

### EventGateway.for(stage) :id=eventgatewayfor
> <p>Creates and starts a new [EventGateway](/content/sdk/lib-gateway?id=eventgateway) for the provided environment.</p>

**Kind**: static method of [<code>EventGateway</code>](#EventGateway)  
**Returns**: <code>Promise.&lt;(EventGateway\|null)&gt;</code>  

| Param | Type |
| --- | --- |
| stage | <code>String</code> | 


* * *

### EventGateway.forDevelopment() :id=eventgatewayfordevelopment
> <p>Creates and starts a new [EventGateway](/content/sdk/lib-gateway?id=eventgateway) for use in the development environment.</p>

**Kind**: static method of [<code>EventGateway</code>](#EventGateway)  
**Returns**: [<code>Promise.&lt;EventGateway&gt;</code>](#EventGateway)  
**Access**: public  

* * *

### EventGateway.forStaging() :id=eventgatewayforstaging
> <p>Creates and starts a new [EventGateway](/content/sdk/lib-gateway?id=eventgateway) for use in the staging environment.</p>

**Kind**: static method of [<code>EventGateway</code>](#EventGateway)  
**Returns**: [<code>Promise.&lt;EventGateway&gt;</code>](#EventGateway)  
**Access**: public  

* * *

### EventGateway.forProduction() :id=eventgatewayforproduction
> <p>Creates and starts a new [EventGateway](/content/sdk/lib-gateway?id=eventgateway) for use in the production environment.</p>

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
> <p>Web service gateway for invoking the Reports API.</p>

**Kind**: global class  
**Extends**: <code>Disposable</code>  
**Access**: public  

* [ReportGateway](#ReportGateway) ⇐ <code>Disposable</code>
    * _instance_
        * [.start()](#ReportGatewaystart) ⇒ [<code>Promise.&lt;ReportGateway&gt;</code>](#ReportGateway)
        * [.startReport(filter)](#ReportGatewaystartReport) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getReportAvailability(source)](#ReportGatewaygetReportAvailability) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getReport(source)](#ReportGatewaygetReport) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getVersion()](#ReportGatewaygetVersion) ⇒ <code>Promise.&lt;String&gt;</code>
    * _static_
        * [.for(stage, credentials)](#ReportGatewayfor) ⇒ <code>Promise.&lt;(ReportGateway\|null)&gt;</code>
        * [.forStaging()](#ReportGatewayforStaging) ⇒ [<code>Promise.&lt;ReportGateway&gt;</code>](#ReportGateway)
        * [.forProduction()](#ReportGatewayforProduction) ⇒ [<code>Promise.&lt;ReportGateway&gt;</code>](#ReportGateway)
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
**Returns**: <code>Promise.&lt;Object&gt;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| filter | <code>Object</code> | 


* * *

### reportGateway.getReportAvailability(source) :id=reportgatewaygetreportavailability
> <p>Returns a report availability.</p>

**Kind**: instance method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: <code>Promise.&lt;Object&gt;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| source | <code>Object</code> | 


* * *

### reportGateway.getReport(source) :id=reportgatewaygetreport
> <p>Downloads a report (as a CSV)</p>

**Kind**: instance method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: <code>Promise.&lt;Object&gt;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| source | <code>String</code> | 


* * *

### reportGateway.getVersion() :id=reportgatewaygetversion
> <p>Returns the server version.</p>

**Kind**: instance method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: <code>Promise.&lt;String&gt;</code>  
**Access**: public  

* * *

### ReportGateway.for(stage, credentials) :id=reportgatewayfor
> <p>Creates and starts a new [ReportGateway](/content/sdk/lib-gateway?id=reportgateway) for the provided environment.</p>

**Kind**: static method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: <code>Promise.&lt;(ReportGateway\|null)&gt;</code>  

| Param | Type |
| --- | --- |
| stage | <code>String</code> | 
| credentials | <code>Object</code> | 


* * *

### ReportGateway.forStaging() :id=reportgatewayforstaging
> <p>Creates and starts a new [ReportGateway](/content/sdk/lib-gateway?id=reportgateway) for use in the staging environment.</p>

**Kind**: static method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: [<code>Promise.&lt;ReportGateway&gt;</code>](#ReportGateway)  
**Access**: public  

* * *

### ReportGateway.forProduction() :id=reportgatewayforproduction
> <p>Creates and starts a new [ReportGateway](/content/sdk/lib-gateway?id=reportgateway) for use in the production environment.</p>

**Kind**: static method of [<code>ReportGateway</code>](#ReportGateway)  
**Returns**: [<code>Promise.&lt;ReportGateway&gt;</code>](#ReportGateway)  
**Access**: public  

* * *

### new ReportGateway(protocol, host, port, credentials) :id=new_reportgateway_new
**Kind**: constructor of [<code>ReportGateway</code>](#ReportGateway)  

| Param | Type | Description |
| --- | --- | --- |
| protocol | <code>String</code> | <p>The protocol to use (either HTTP or HTTPS).</p> |
| host | <code>String</code> | <p>The host name of the Events web service.</p> |
| port | <code>Number</code> | <p>The TCP port number of the Events web service.</p> |
| credentials | <code>Object</code> | <p>The credentials of the Report API.</p> |


* * *

