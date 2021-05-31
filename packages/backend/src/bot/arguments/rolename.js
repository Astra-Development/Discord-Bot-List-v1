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

const { Argument, util: { regExpEsc } } = require('klasa');
const { Role } = require('discord.js');

const ROLE_REGEXP = Argument.regex.role;

function resolveRole(query, guild) {
	if (query instanceof Role) return guild.roles.has(query.id) ? query : null;
	if (typeof query === 'string' && ROLE_REGEXP.test(query)) return guild.roles.get(ROLE_REGEXP.exec(query)[1]);
	return null;
}

module.exports = class extends Argument {

	async run(arg, possible, message) {
		if (!message.guild) return this.role(arg, possible, message);
		const resRole = resolveRole(arg, message.guild);
		if (resRole) return resRole;

		const results = [];
		const reg = new RegExp(regExpEsc(arg), 'i');
		for (const role of message.guild.roles.values()) { if (reg.test(role.name)) results.push(role); }

		let querySearch;
		if (results.length > 0) {
			const regWord = new RegExp(`\\b${regExpEsc(arg)}\\b`, 'i');
			const filtered = results.filter(role => regWord.test(role.name));
			querySearch = filtered.length > 0 ? filtered : results;
		} else querySearch = results;


		switch (querySearch.length) {
			case 0: throw `${possible.name} Must be a valid name, id or role mention`;
			case 1: return querySearch[0];
			default: throw `Found multiple matches: \`${querySearch.map(role => role.name).join('`, `')}\``;
		}
	}

};
