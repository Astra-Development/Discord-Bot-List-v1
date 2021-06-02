const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");

const { web: { domain_with_protocol } } = require("@root/config.json");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      usage: "[User:user]",
      description: "Check member's bots."
    });
  }

  async run(message, [user]) {
    let person = user ? user : message.author;

    if (person.bot) return;

    let bots = await Bots.find({ $or: [{ "owners.primary": person.id }, { "owners.additional": person.id }], state: { $ne: "deleted" } }, { _id: false });

    if (bots.length === 0) return message.channel.send(`\`${person.tag}\` has no bots.`)
    var cont = ``
    var un = false;
    for (let i = 0; i < bots.length; i++) {
      let bot = bots[i];
      if (bot.state == "unverified") {
        un = true
        cont += `~~<@${bot.botid}>~~\n`
      } else cont += `● <@${bot.botid}> **[Website Link](${domain_with_protocol}/bots/${bot.botid})**\n`
    }
    let e = new MessageEmbed()
      .setAuthor(`${person.username}#${person.discriminator}`, `${person.displayAvatarURL({ dynamic: true })}`)
      .setTitle('Bots')
      .setDescription(cont)
      .setColor('BLUE')
    if (un) e.setFooter(`Bots with strikethrough are unverified on our botlist.`)
    message.channel.send(e)
  }

};