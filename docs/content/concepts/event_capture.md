## Overview

As events occur, they are transmitted to the backend.

## Event Gateway

The ```EventGateway``` class handles communication with the remote service on your behalf. Depending on your environment, obtain an instance as follows:

```js
const EventGateway = require('@barchart/events-client-js/lib/gateway/EventGateway');

EventGateway.forStaging()
	.then((eventGateway) => {
		// ready ...
	});
```

or

```js
const EventGateway = require('@barchart/events-client-js/lib/gateway/EventGateway');

EventGateway.forProduction()
	.then((eventGateway) => {
		// ready ...
	});
```

## Immediate Capture

Assuming you have defined an event as described in the [Key Concepts: Event Structure](content/concepts/event_structure) section, it can be sent to the remote service as follows:

```js
const events = [ eventA, eventB, eventC ];

eventGateway.createEvents(events)
	.then((created) => {
		console.log(`Sent [ ${created.length} ] event(s) to the Barchart Event Tracking Service.`);
	});
```

## Buffered Capture

Depending on the number of events which your software generates, it may be advisable to buffer communication with the remote service. The ```EventBarcher``` utility accepts events and periodically sends them to the remote service.

Here is an example:

```js
const EventBatcher = require('@barchart/events-client-js/lib/engine/EventBatcher');

const batcher = new EventBatcher(eventGateway);

batcher.push(eventA);
batcher.push(eventB);
batcher.push(eventC);
```

