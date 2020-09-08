/**
 * A meta namespace containing structural contracts of anonymous objects.
 *
 * @namespace Schema
 */

/**
 * An event.
 *
 * @typedef Event
 * @type {Object}
 * @memberOf Schema
 * @property {CustomerType} customer - The customer using the software which generated the event.
 * @property {ProductType} product - The software system which generated the event.
 * @property {EventType} type - The type of event.
 * @property {Number} timestamp - The time of the event's occurrence.
 * @property {Array<String>} context - Additional data which is appropriate for the event's type.
 */