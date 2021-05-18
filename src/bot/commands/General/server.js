const { Command, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

const verificationLevels = [ 'None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻' ];

const filterLevels = [ 'Off', 'No Role', 'Everyone' ];
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['guild'],
			description: 'Get information on the current server.'
		});

		this.timestamp = new Timestamp('d MMMM YYYY');
	}

	run(message) {
		return message.sendEmbed(new MessageEmbed()
			.setColor(0x00AE86)
			.setThumbnail(message.guild.iconURL())
			.addField('❯ Name', message.guild.name, true)
			.addField('❯ ID', message.guild.id, true)
			.addField('❯ Creation Date', this.timestamp.display(message.guild.createdAt), true)
			.addField('❯ Region', message.guild.region, true)
			.addField('❯ Owner', message.guild.owner ? message.guild.owner.user.tag : 'None', true)
			.addField('❯ Members', message.guild.memberCount, true));
	}

};
