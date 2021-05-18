const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 6,
			requiredPermissions: ['BAN_MEMBERS'],
			runIn: ['text'],
			description: 'Unbans a user.',
			usage: '<user:user> [reason:string] [...]',
			usageDelim: ' '
		});
	}

	async run(message, [user, ...reason]) {
		const bans = await message.guild.fetchBans();
		if (bans.has(user.id)) {
			await message.guild.members.unban(user, reason.join(' '));
		} else throw 'This user was not banned so I can not unban them.';

		return message.sendMessage(`**Un-Banned: ${user.tag} / ${user.id}**\nModerator: ${message.author}.${reason ? ` With reason of: ${reason}` : ''}`);
	}

};
