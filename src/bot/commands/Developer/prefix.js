/*
MIT License

Copyright (c) 2017-2018 dirigeants

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: [],
			permissionLevel: 6,
			description: 'Change the prefix of the bot for your server.',
			extendedHelp: [
				'To change the prefix of your server:',
				'',
				'<prefix>prefix newPrefix',
				'',
				'Reset your prefix to the default prefix',
				'',
				'<prefix>prefix',
				'',
				'**__Example Use__**',
				'.prefix !'
			].join('\n'),
			usage: '[prefix:str{1,10}]'
		});
	}

	async run(message, [prefix]) {
		if (!prefix) return this.reset(message);

		if (message.guild.settings.prefix === prefix) throw message.language.get('CONFIGURATION_EQUALS');

		await message.guild.settings.update('prefix', prefix);
		return message.sendMessage(`The prefix for this guild has been set to ${prefix}`);
	}

	async reset(message) {
		await message.guild.settings.update('prefix', this.client.options.prefix);
		return message.sendMessage(`Switched back the guild's prefix back to \`${this.client.options.prefix}\`!`);
	}

};
