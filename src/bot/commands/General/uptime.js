const { Command } = require('klasa');
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      aliases: ["up"],
      cooldown: "5",
      description: "Shows the bot's uptime.",
    });
  }

  async run(message, args, client) {
    let days = Math.floor(message.client.uptime / 86400000);
    let hours = Math.floor(message.client.uptime / 3600000) % 24;
    let minutes = Math.floor(message.client.uptime / 60000) % 60;
    let seconds = Math.floor(message.client.uptime / 1000) % 60;

    let uptime = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
      .setDescription(`\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds`)
    message.channel.send(uptime);
  }
}