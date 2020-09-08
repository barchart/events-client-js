## Contents {docsify-ignore}

* [EventBatcher](#EventBatcher) 

* [EventFactory](#EventFactory) 


* * *

## EventBatcher :id=eventbatcher
> <p>A utility which buffers [Schema.Event](/content/sdk/lib-data?id=schemaevent) objects and periodically
> transmits them to backend in batches.</p>

**Kind**: global class  
**Access**: public  

* [EventBatcher](#EventBatcher)
    * _instance_
        * [.start()](#EventBatcherstart)
        * [.stop()](#EventBatcherstop)
        * [.clear()](#EventBatcherclear)
        * [.push(event)](#EventBatcherpush)
    * _constructor_
        * [new EventBatcher(eventGateway, [callback])](#new_EventBatcher_new)


* * *

### eventBatcher.start() :id=eventbatcherstart
> <p>Begins queue processing. Items in the buffer will begin to be transmitted
> to the remote service.</p>

**Kind**: instance method of [<code>EventBatcher</code>](#EventBatcher)  
**Access**: public  

* * *

### eventBatcher.stop() :id=eventbatcherstop
> <p>Stops the queue processing. Items in the buffer accumulate without being
> transmitted to the remote service.</p>

**Kind**: instance method of [<code>EventBatcher</code>](#EventBatcher)  
**Access**: public  

* * *

### eventBatcher.clear() :id=eventbatcherclear
> <p>Clears the internal buffer.</p>

**Kind**: instance method of [<code>EventBatcher</code>](#EventBatcher)  
**Access**: public  

* * *

### eventBatcher.push(event) :id=eventbatcherpush
> <p>Adds a new event to the buffer.</p>

**Kind**: instance method of [<code>EventBatcher</code>](#EventBatcher)  
**Access**: public  

| Param | Type |
| --- | --- |
| event | [<code>Schema.Event</code>](/content/sdk/lib-data?id=schemaevent) | 


* * *

### new EventBatcher(eventGateway, [callback]) :id=new_eventbatcher_new
**Kind**: constructor of [<code>EventBatcher</code>](#EventBatcher)  

| Param | Type |
| --- | --- |
| eventGateway | [<code>EventGateway</code>](/content/sdk/lib-gateway?id=eventgateway) | 
| [callback] | <code>function</code> | 


* * *

## EventFactory :id=eventfactory
> <p>A utility for simplifying the construction of event.</p>

**Kind**: global class  
**Access**: public  

* [EventFactory](#EventFactory)
    * _instance_
        * [.build(type, context)](#EventFactorybuild) ⇒ [<code>Schema.Event</code>](/content/sdk/lib-data?id=schemaevent)
    * _static_
        * [.for(customer, product)](#EventFactoryfor) ⇒ [<code>EventFactory</code>](#EventFactory)
    * _constructor_
        * [new EventFactory(customer, product)](#new_EventFactory_new)


* * *

### eventFactory.build(type, context) :id=eventfactorybuild
> <p>Creates a new [Schema.Event](/content/sdk/lib-data?id=schemaevent) object, using the factory's customer and product.</p>

**Kind**: instance method of [<code>EventFactory</code>](#EventFactory)  
**Returns**: [<code>Schema.Event</code>](/content/sdk/lib-data?id=schemaevent)  
**Access**: public  

| Param | Type |
| --- | --- |
| type | <code>EventType</code> | 
| context | <code>Array</code> | 


* * *

### EventFactory.for(customer, product) :id=eventfactoryfor
> <p>Configures a new event factory, which will build events for a specific customer and product.</p>

**Kind**: static method of [<code>EventFactory</code>](#EventFactory)  
**Returns**: [<code>EventFactory</code>](#EventFactory)  
**Access**: public  

| Param | Type |
| --- | --- |
| customer | <code>CustomerType</code> | 
| product | <code>ProductType</code> | 


* * *

### new EventFactory(customer, product) :id=new_eventfactory_new
**Kind**: constructor of [<code>EventFactory</code>](#EventFactory)  

| Param | Type |
| --- | --- |
| customer | <code>CustomerType</code> | 
| product | <code>ProductType</code> | 


* * *

