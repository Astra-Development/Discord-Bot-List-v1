class Util {

	constructor() {
		throw new Error('The util class is a static class and should not be constructed.');
	}

	/**
	 * Checks if a string is valid JSON
	 * @param {string} json The string to check if it is valid JSON
	 * @returns {*}
	 */
	static checkJson(json) {
    try {
      JSON.parse(json);
      return true;
    } catch (e) {
      return e;
    }
  }


};

module.exports = Util;
