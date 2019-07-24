module.exports = (() => {
	'use strict';

	/**
	 * Static configuration data.
	 *
	 * @public
	 */
	class Configuration {
		constructor() {}

		/**
		 * The host of the development system.
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get development() {
			return 'jr1w6tgfr8.execute-api.us-east-1.amazonaws.com/stage';
		}

		/**
		 * The host of the staging system.
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get staging() {
			return 'jr1w6tgfr8.execute-api.us-east-1.amazonaws.com/stage';
		}

		/**
		 * The host of the production system.
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get production() {
			return 'jr1w6tgfr8.execute-api.us-east-1.amazonaws.com/stage';
		}
	}

	return Configuration;
})();
