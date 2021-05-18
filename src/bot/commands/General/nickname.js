const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['MANAGE_NICKNAMES'],
			aliases: ['nick'],
			permissionLevel: 0,
			description: 'Allows users to change their nicknames',
			usage: '[nick:string{,32}]',
		});
	}

	async run(message, [nick]) {
		message.member.setNickname(nick).catch(e => { throw e });

		return message.sendMessage(nick ? `Your nickname has been set to ${nick}` : 'Your nickname has been reset');
	}

};
