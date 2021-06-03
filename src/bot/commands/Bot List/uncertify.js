const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");
const Users = require("@models/users");
const { server: { mod_log_id, role_ids, admin_user_ids } } = require("@root/config.json");
const perms = require("@root/config.json");
const reasons = {
  "1": `Your bot went offline during testing.`,
  "2": `Your bot seems to be an unmodified. We don't allow unmodified clones of other bots.`,
  "3": `Your bot was **offline** when we tried to review it. For that reason, we are unable to test it. Please get your bot online and re-apply.`,
  "4": `The majority of your commands listed on your bot's page, or help command do not provide a response, or do not seem to function/work.`,
  "5": `Your bot doesn't have any/enough working commands. (Minimum: 7)`,
  "6": `The long description on your bot's page is filled out with spam/junk to reach the 300 character minimum requirement. Please rewrite your description to include more useful information about your bot.`,
  "7": `Your bot doesn't have a (working) help command or obvious point of entry. Please make sure your bot has a help command or has an explanation in the bot description.`,
  "8": `Your bot's commands have emojis or gifs that could cause epileptic seizures due to its flashy and flickering nature. Please remove all content of such nature in your commands.`
}
var modLog;

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'uncertify',
      runIn: ['text'],
      aliases: ["uncert"],
      description: "Uncertify's a bot",
      usage: '[User:user]'
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

    //if (!admin_user_ids.includes(message.author.id)) return

    if (!user || !user.bot) return message.channel.send(`Ping a **bot**.`);

    let bot = await Bots.findOne({ botid: user.id }, { _id: false });
    if (bot === null)
      return message.channel.send({
        embed: {
          color: 'RED',
          description: `${message.author} This bot is not on our botlist`,
        }
      });

    if (bot.certify === false)
      return message.channel.send({
        embed: {
          color: 'RED',
          description: `${message.author}, \`${bot.username}\` is already un-certify`,
        }
      });

    const botUser = await this.client.users.fetch(user.id);
    if (bot.logo !== botUser.displayAvatarURL({ format: "png", size: 256 }))
      await Bots.updateOne({ botid: user.id }, { $set: { certify: true, logo: botUser.displayAvatarURL({ format: "png", size: 256 }) } });
    else
      await Bots.updateOne({ botid: user.id }, { $set: { certify: false } })

    let owners = [bot.owners.primary].concat(bot.owners.additional)
    let e = new MessageEmbed()
      .setTitle('Bot Un-Certified')
      .addField(`Bot ID`, `${bot.botid}`, true)
      .addField(`Bot Owner`, owners.map(x => x ? `<@${x}>` : ""), true)
      .addField("Reviewer", message.author, true)
      .setThumbnail(botUser.displayAvatarURL({ format: "png", size: 256 }))
      .setColor("RED")
    modLog.send(e);
    modLog.send(owners.map(x => x ? `<@${x}>` : "")).then(m => { m.delete() });

    owners = await message.guild.members.fetch({ user: owners })
    owners.forEach(o => {
      Users.updateOne({ userid: o.id }, { $set: { certdev: 0 } }).then();
      o.roles.add(message.guild.roles.cache.get(role_ids.cert_user));
      o.send(`Your bot \`${bot.username}\` / <@${bot.botid}> has been Un-certified.`)
    })
    message.guild.members.fetch(message.client.users.cache.find(u => u.id === bot.botid)).then(bot => {
      bot.roles.set([role_ids.bot, role_ids.verified]);
    })
    message.channel.send(`Uncertified \`${bot.username}\``);
  }

  async init() {
    modLog = this.client.channels.cache.get(mod_log_id);
  }
};