const { Monitor } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			ignoreOthers: false,
			ignoreEdits: false
		});
	}

	async run(message) {
		if (!message.guild) return null;

		const { customCommands } = message.guild.settings;
		if (!customCommands.length) return null;

		const commandToUse = customCommands.find(command => command.name === message.content);
		if (!commandToUse) return null;

		this.client.console.log(`Sending Custom Command: "${message.content}" was run on ${message.guild.name} by ${message.author.tag}`);

		if (commandToUse.content[0] !== '{') return message.sendMessage(commandToUse.content)
		else {
			const commandObject = JSON.parse(commandToUse.content);

			const embed = new MessageEmbed();
			if (commandObject.author) embed.setAuthor(commandObject.author.name, commandObject.author.iconURL || commandObject.author.icon_url, commandObject.author.url || null);
			if (commandObject.title) embed.setTitle(commandObject.title);
			if (commandObject.description) embed.setDescription(commandObject.description);
			if (commandObject.url) embed.setURL(commandObject.url);
			if (commandObject.color) embed.setColor(commandObject.color);
			if (commandObject.timestamp) embed.setTimestamp(commandObject.timestamp);
			if (commandObject.footer) embed.setFooter(commandObject.footer.text, commandObject.footer.iconURL || commandObject.footer.icon_url);
			if (commandObject.thumbnail) embed.setThumbnail(commandObject.thumbnail);
			if (commandObject.image) embed.setImage(commandObject.image);
			if (commandObject.fields) for (const field of commandObject.fields) embed.addField(field.name, field.value, field.inline ? true : false);

			return message.sendEmbed(embed, commandObject.plaintext);
		}
  }

};
