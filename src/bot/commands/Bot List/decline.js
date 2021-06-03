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
      name: 'decline',
      aliases: ["deny"],
      runIn: ['text'],
      botPerms: ["SEND_MESSAGES"],
      description: "Decline a bot from the botlist",
      usage: '[Member:user]'
    });
  }

  async run(message, [Member]) {

    let bot1 = await Bots.findOne({ botid: Member.id }, { _id: false });

    if (bot1 === null)
      return message.channel.send({
        embed: {
          color: 'RED',
          description: `${message.author} This bot is not on our botlist`,
        }
      });

    if (!perms.server.botreviewer.includes(message.author.id))
      return message.channel.send({
        embed: {
          color: 'RED',
          description: `${message.author}, You do not have enough permissions to run this command.`,
        }
      });

    if (!Member || !Member.bot) return message.channel.send(`You didn't ping a bot to decline.`)

    let e = new MessageEmbed()
      .setTitle('Decline Reasons')
      .setColor('#ff0000')
      .addField(`Removing bot`, `${Member}`)
    let cont = ``;
    for (let k in reasons) {
      let r = reasons[k];
      cont += ` ● **${k}**: ${r}\n`
    }

    cont += `\nEnter a valid reason number or your own reason.`
    e.setDescription(cont)
    message.channel.send(e);
    let filter = m => m.author.id === message.author.id;

    let collected = await message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] });
    let reason = collected.first().content
    let r = collected.first().content;
    if (parseInt(reason)) {
      r = reasons[reason]
      if (!r) return message.channel.send("Inavlid reason number.")
    }

    let bot = await Bots.findOne({ botid: Member.id }, { _id: false });

    await Bots.updateOne({ botid: Member.id }, { $set: { state: "deleted", owners: { primary: bot.owners.primary, additional: [] } } });
    const botUser = await this.client.users.fetch(Member.id);

    if (!bot) return message.channel.send(`Unknown Error. Bot not found.`)
    let owners = [bot.owners.primary].concat(bot.owners.additional)
    e = new MessageEmbed()
      .setTitle('Bot Declined')
      .addField(`Bot ID`, `${bot.botid}`, true)
      .addField(`Bot Owner`, owners.map(x => x ? `<@${x}>` : ""), true)
      .addField("Reviewer", message.author, true)
      .addField("Reason", r)
      .setThumbnail(botUser.displayAvatarURL({ format: "png", size: 256 }))
      .setColor('#FF4200')
    modLog.send(e)
    modLog.send(owners.map(x => x ? `<@${x}>` : "")).then(m => { m.delete() });
    message.channel.send(`Bot <@${bot.botid}> has been declined successfully.`)

    owners = await message.guild.members.fetch({ user: owners })
    owners.forEach(o => {
      o.send(`Your bot \`${bot.username}\` / <@${bot.botid}> has been declined by reviewer ${message.author}.\nReason: ${r}\nIf you would like to dispute your decline, please DM ${message.author} (User ID: ${message.author.id})`)
    })

    if (!message.client.users.cache.find(u => u.id === bot.botid).bot) return;
    try {
      message.guild.members.fetch(message.client.users.cache.find(u => u.id === bot.botid))
        .then(bot => {
          bot.kick().then(() => { })
            .catch(e => { console.log(e) })
        }).catch(e => { console.log(e) });
    } catch (e) { console.log(e) }
  }

  async init() {
    modLog = this.client.channels.cache.get(mod_log_id);
  }
};
