const { Structures } = require('discord.js');
const MusicManager = require('../structures/MusicManager');

module.exports = Structures.extend('Guild', Guild => {
	/**
	 * Sneyra's Extended Guild
	 * @extends {Guild}
	 */
	class SneyraGuild extends Guild {

		/**
		 * @param {...*} args Normal D.JS Guild args
		 */
		constructor(...args) {
			super(...args);

			/**
			 * The MusicManager instance for this client
			 * @since 2.0.0
			 * @type {MusicManager}
			 */
			this.music = new MusicManager(this);
		}

	}

	return SneyraGuild;
});
