/**
 * A meta namespace containing structural contracts of anonymous objects.
 *
 * @namespace Schema
 */

/**
 * Describes the occurrence of a single event. In other words, a usage statistic.
 *
 * @typedef Event
 * @type {Object}
 * @memberOf Schema
 * @property {CustomerType} customer - The customer using the software which generated the event.
 * @property {ProductType} product - The software system which generated the event.
 * @property {EventType} type - The type of event.
 * @property {Timestamp} timestamp - The time of the event's occurrence.
 * @property {String[]} context - Additional data which is appropriate for the event's type.
 */

/**
 * Criteria used to filter events (i.e. usage statistics) for extraction to a
 * report file.
 *
 * @typedef ReportFilter
 * @type {Object}
 * @memberOf Schema
 * @property {CustomerType} customer - The customer to extract events for.
 * @property {ProductType} product - The software system to extract events for.
 * @property {Timestamp=} start - The time to begin extracting events.
 * @property {Timestamp=} end - The time to stop extracting events.
 */

/**
 * Describes the status (i.e. progress) of event extraction to a report file.
 *
 * @typedef ReportStatus
 * @type {Object}
 * @memberOf Schema
 * @property {String} job - The job's "short" identifier.
 * @property {String} source - The job's identifier (used for must purposes).
 * @property {EventJobStatus} status - Current status of report generation (e.g. running, complete, timeout, or failed).
 * @property {Schema.ReportFilter} filter - The criteria used for report generation.
 */
