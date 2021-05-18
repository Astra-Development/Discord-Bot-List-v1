const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 6,
			requiredPermissions: ['BAN_MEMBERS'],
			runIn: ['text'],
			description: 'Bans a mentioned user. Currently does not require reason (no mod-log).',
			usage: '<member:user> [reason:string] [...]',
			usageDelim: ' '
		});
	}

	async run(message, [user, ...reason]) {
		if (user.id === message.author.id) throw 'Why would you ban yourself?';
		if (user.id === this.client.user.id) throw 'Have I done something wrong?';

		const member = await message.guild.members.fetch(user).catch(() => null);
		if (member) {
			if (member.roles.highest.position >= message.member.roles.highest.position) throw 'You cannot ban this user.';
			if (!member.bannable) throw 'I cannot ban this user.';
		}

		const options = {};
		reason = reason.length ? reason.join(' ') : null;
		if (reason) options.reason = reason;

		await message.guild.members.ban(user, options);
		return message.sendMessage(`Banned: **${member.user.tag} / ${member.user.id}**\nModerator: ${message.author}\n${reason ? ` With reason of: ${reason}` : ''}`);
	}

};
