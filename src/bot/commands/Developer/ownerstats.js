const { Command, version: klasaVersion, Duration } = require('klasa');
const { version: discordVersion, MessageEmbed } = require('discord.js')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'See the bots private stats that users don\'t need.',
			permissionLevel: 10,
			aliases: ['os']
		});
	}

	async run(message) {
		return message.send(new MessageEmbed()
		.setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
		.setColor(7415665)
		.addField(`Memory Usage:`,  (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),true)
		.addField(`Uptime:`, Duration.toNow(Date.now() - (process.uptime() * 1000)),true)
		.addField(`Default Prefix:`,(this.client.options.prefix),true)
		.addField(`Klasa Version:`,klasaVersion,true)
		.addField(`Discord.js Version:`, discordVersion,true)
		.addField(`Node.js Version`, process.version,true))
    }
}
