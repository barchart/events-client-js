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
			return '6xrf96awp3.execute-api.us-east-1.amazonaws.com/stage';
		}

		/**
		 * The host of the staging system.
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get staging() {
			return '6xrf96awp3.execute-api.us-east-1.amazonaws.com/stage';
		}

		/**
		 * The host of the production system.
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get production() {
			return '6xrf96awp3.execute-api.us-east-1.amazonaws.com/stage';
		}
	}

	return Configuration;
})();
