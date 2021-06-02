const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");
const { web: { domain_with_protocol } } = require("@root/config.json");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      usage: '[User:user]',
      description: "Get bot information"
    });
  }

  async run(message, [user]) {
    if (!user || !user.bot) return message.channel.send(`Please include a bot mention or ID`);
    if (user.id === message.client.user.id) return message.channel.send(`Bot not found.`);

    const bot = await Bots.findOne({ botid: user.id }, { _id: false })
    if (!bot) return message.channel.send(`Bot not found.`);
    let servers;
    if (bot.servers[bot.servers.length - 1])
      servers = bot.servers[bot.servers.length - 1].count;
    else servers = null;
    const botUser = await this.client.users.fetch(user.id);
    if (bot.logo !== botUser.displayAvatarURL({ format: "png", size: 256 }))
      await Bots.updateOne({ botid: user.id }, { $set: { logo: botUser.displayAvatarURL({ format: "png", size: 256 }) } });
    let e = new MessageEmbed()

    e.setColor('ORANGE')
    e.setAuthor(bot.username, botUser.displayAvatarURL({ format: "png", size: 256 }), bot.invite)
    e.setThumbnail(botUser.displayAvatarURL({ format: "png", size: 256 }))

    e.addField(`Bot ID`, !bot.botid ? "Unknown" : bot.botid, true)
    e.addField(`Bot Username`, bot.username ? bot.username : "Unknown", true)
    e.addField(`Bot Owner`, `<@${bot.owners.primary}>`, true)
    e.addField(`Bot Joined BotList`, bot.addedAt, true)
    e.addField(`Bot Created`, `${user.createdAt}`, true)
    e.addField(`\u200b`, `\u200b`, true)

    e.addField(`[+] Visit on Astra Bots`, `[Click Here](${domain_with_protocol}/bots/${bot.botid})`, true)
    e.addField(`[+] Invite the Bot`, `[Click Here](${bot.invite})`, true)
    e.addField(`\u200b`, `\u200b`, true)

    e.addField(`Description`, bot.description, false)

    e.addField(`Prefix`, bot.prefix ? bot.prefix : "Unknown", true)
    e.addField(`Votes`, `${bot.likes || 0} Likes`, true)
    e.addField(`Status`, user.presence.status, true)
    e.addField(`Queue`, !bot.state ? "Not Verified" : 'Verified', true)
    e.addField(`Certified`, !bot.certify ? "False" : 'True', true)
    // e.addField(`Server Count`, `${servers || 0} Servers`, true)

    e.addField(`Github`, !bot.github ? "Not Set" : `[Click Here](${bot.github})`, true)
    e.addField(`Donation`, !bot.donation ? "Not Set" : `[Click Here](${bot.donation})`, true)
    e.addField(`Website`, !bot.website ? "Not Set" : `[Click Here](${bot.website})`, true)
    e.addField(`Support Server`, !bot.support ? "Not Set" : `[Click Here](${bot.support})`, true)

    // e.addField(`\u200b`, `\u200b`, true)
    message.channel.send(e);
  }
};