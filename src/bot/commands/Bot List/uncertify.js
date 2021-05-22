const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");
const Users = require("@models/users");
const { server: { mod_log_id, role_ids, admin_user_ids } } = require("@root/config.json");
const reasons = {
  "1": `Your bot was offline when we tried to certify it.`,
  "2": `Your bot is a clone of another bot`,
  "3": `Your bot responds to other bots`,
  "4": `Your bot doesn't have any/enough working commands. (Minimum: 7)`,
  "5": `Your bot has NSFW commands that work in non-NSFW marked channels`,
  "6": `Your bot doesn't have a working help command or commands list`
}
var modLog;

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'uncertify',
      runIn: ['text'],
      aliases: ["uncert"],
      description: "Uncertify's a bot",
      permissionLevel: 8,
      usage: '[User:user]'
    });
  }

  async run(message, [user]) {






    //if (!admin_user_ids.includes(message.author.id)) return









    if (!user || !user.bot) return message.channel.send(`Ping a **bot**.`);


    let bot = await Bots.findOne({ botid: user.id }, { _id: false });



    const botUser = await this.client.users.fetch(user.id);
    if (bot.logo !== botUser.displayAvatarURL({ format: "png", size: 256 }))
      await Bots.updateOne({ botid: user.id }, { $set: { certify: true, logo: botUser.displayAvatarURL({ format: "png", size: 256 }) } });
    else
      await Bots.updateOne({ botid: user.id }, { $set: { certify: false } })

    let owners = [bot.owners.primary].concat(bot.owners.additional)
    let e = new MessageEmbed()
      .setTitle('Bot Un-Certified')
      .addField(`Bot`, `<@${bot.botid}>`, true)
      .addField(`Owner(s)`, owners.map(x => x ? `<@${x}>` : ""), true)
      .addField("Mod", message.author, true)

      .setThumbnail(botUser.displayAvatarURL({ format: "png", size: 256 }))
      .setTimestamp()
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
      bot.roles.set([role_ids.cert_bot, role_ids.bot]);
    })
    message.channel.send(`Uncertified \`${bot.username}\``);






  }


  async init() {
    modLog = this.client.channels.cache.get(mod_log_id);
  }
};