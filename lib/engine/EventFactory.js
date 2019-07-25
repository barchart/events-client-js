const assert = require('@barchart/common-js/lang/assert'),
	Timestamp = require('@barchart/common-js/lang/Timestamp');

const CustomerType = require('@barchart/events-api-common/lib/data/CustomerType'),
	EventType = require('@barchart/events-api-common/lib/data/EventType'),
	ProductType = require('@barchart/events-api-common/lib/data/ProductType');

module.exports = (() => {
	'use strict';

	class EventFactory {
		constructor(customer, product) {
			assert.argumentIsRequired(customer, 'customer', CustomerType, 'CustomerType');
			assert.argumentIsRequired(product, 'product', ProductType, 'ProductType');

			this._customer = customer;
			this._product = product;
		}

		static for(customer, product) {
			return new EventFactory(customer, product);
		}

		build(type, context) {
			assert.argumentIsRequired(type, 'type', EventType, 'EventType');
			assert.argumentIsArray(context,'context');

			return {
				customer: this._customer,
				product: this._product,
				type: type,
				timestamp: Timestamp.now().timestamp,
				context: context,
			};
		}
	}

	return EventFactory;
})();
