## Contents {docsify-ignore}

* [EventBatcher](#EventBatcher) 

* [EventFactory](#EventFactory) 

* [Event](#Event) 


* * *

## EventBatcher :id=eventbatcher
> <p>A wrapper utility for an [@EventGateway](#@eventgateway) which caches and
> periodically sends new [Event](/content/sdk/lib-engine?id=event) objects to the server.</p>

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
> <p>Starts the scheduler for transmitting events, causing
> events to be periodically flushed from the buffer.</p>

**Kind**: instance method of [<code>EventBatcher</code>](#EventBatcher)  
**Access**: public  

* * *

### eventBatcher.stop() :id=eventbatcherstop
> <p>Stops the scheduler, causing events to accumulate in
> the buffer.</p>

**Kind**: instance method of [<code>EventBatcher</code>](#EventBatcher)  
**Access**: public  

* * *

### eventBatcher.clear() :id=eventbatcherclear
> <p>Clears the internal buffer of any events waiting to be
> sent to the server.</p>

**Kind**: instance method of [<code>EventBatcher</code>](#EventBatcher)  
**Access**: public  

* * *

### eventBatcher.push(event) :id=eventbatcherpush
> <p>Adds a new event to the buffer.</p>

**Kind**: instance method of [<code>EventBatcher</code>](#EventBatcher)  
**Access**: public  

| Param | Type |
| --- | --- |
| event | [<code>Event</code>](#Event) | 


* * *

### new EventBatcher(eventGateway, [callback]) :id=new_eventbatcher_new
**Kind**: constructor of [<code>EventBatcher</code>](#EventBatcher)  

| Param | Type |
| --- | --- |
| eventGateway | [<code>EventGateway</code>](/content/sdk/lib-gateway?id=eventgateway) | 
| [callback] | <code>function</code> | 


* * *

## EventFactory :id=eventfactory
> <p>A factory for event objects.</p>

**Kind**: global class  
**Access**: public  

* [EventFactory](#EventFactory)
    * _instance_
        * [.build(type, context)](#EventFactorybuild) ⇒ [<code>Event</code>](#Event)
    * _static_
        * [.for(customer, product)](#EventFactoryfor) ⇒ [<code>EventFactory</code>](#EventFactory)
    * _constructor_
        * [new EventFactory(customer, product)](#new_EventFactory_new)


* * *

### eventFactory.build(type, context) :id=eventfactorybuild
> <p>Creates a new event object, using the factory's customer and
> product.</p>

**Kind**: instance method of [<code>EventFactory</code>](#EventFactory)  
**Returns**: [<code>Event</code>](#Event)  
**Access**: public  

| Param | Type |
| --- | --- |
| type | <code>EventType</code> | 
| context | <code>Array</code> | 


* * *

### EventFactory.for(customer, product) :id=eventfactoryfor
> <p>Configures a new event factory, which will build events for a specific
> customer and product.</p>

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

## Event :id=event
> <p>An event.</p>

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| customer | <code>CustomerType</code> | 
| product | <code>ProductType</code> | 
| type | <code>EventType</code> | 
| timestamp | <code>Number</code> | 
| context | <code>Array</code> | 


* * *

