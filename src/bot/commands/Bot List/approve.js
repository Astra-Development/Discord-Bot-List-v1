const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");
const perms = require("@root/config.json");
const { server: { mod_log_id, role_ids } } = require("@root/config.json");

var modLog;

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      usage: '[User:user]',
      description: "Approve a bot"
    });
  }

  async run(message, [user]) {
    if (!perms.server.botreviewer.includes(message.author.id))
      return message.channel.send({
        embed: {
          color: 'RED',
          description: `${message.author}, You do not have enough permissions to run this command.`,
        }
      });
      
    if (!user || !user.bot) return message.channel.send(`Ping a **bot**.`);
    let bot = await Bots.findOne({ botid: user.id }, { _id: false });

    if (bot === null)
      return message.channel.send({
        embed: {
          color: 'RED',
          description: `this bot is not on our botlist`,
        }
      });

    if (bot.state === 'verified')
      return message.channel.send({
        embed: {
          color: 'RED',
          description: `${message.author}, \`${bot.username}\` is already verified`,
        }
      });

    const botUser = await this.client.users.fetch(user.id);
    if (bot.logo !== botUser.displayAvatarURL({ format: "png", size: 256 }))
      await Bots.updateOne({ botid: user.id }, { $set: { state: "verified", logo: botUser.displayAvatarURL({ format: "png", size: 256 }) } });
    else
      await Bots.updateOne({ botid: user.id }, { $set: { state: "verified" } })

    let owners = [bot.owners.primary].concat(bot.owners.additional)
    let e = new MessageEmbed()
      .setTitle('Bot Approved')
      .addField(`Bot`, `<@${bot.botid}>`, true)
      .addField(`Owner(s)`, owners.map(x => x ? `<@${x}>` : ""), true)
      .addField("Reviewer", message.author, true)
      .setThumbnail(botUser.displayAvatarURL({ format: "png", size: 256 }))
      .setColor(0x26ff00)
    modLog.send(e);
    modLog.send(owners.map(x => x ? `<@${x}>` : "")).then(m => { m.delete() });

    owners = await message.guild.members.fetch({ user: owners })
    owners.forEach(o => {
      o.roles.add(message.guild.roles.cache.get(role_ids.bot_developer));
      o.send(`Your bot <@${bot.botid}> has been approved! :data:`)
    })
    message.guild.members.fetch(message.client.users.cache.find(u => u.id === bot.botid)).then(bot => {
      bot.roles.set([role_ids.bot, role_ids.verified]);
    })
    message.channel.send(`Approved \`${bot.username}\``);
  }

  async init() {
    modLog = await this.client.channels.fetch(mod_log_id);
  }
};