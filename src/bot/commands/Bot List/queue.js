const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");

const { server: { id } } = require("@root/config.json");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["q"],
      description: "Get the queue list of Astra's Bot List"
    });
  }

  async run(message) {
    let cont = "";
    let bots = await Bots.find({ state: "unverified" }, { _id: false })

    bots.forEach(bot => { cont += `● **[Owner: <@${bot.owners.primary}> ]** - <@${bot.botid}> **[ [Invite to Test](https://discord.com/oauth2/authorize?client_id=${bot.botid}&scope=bot&guild_id=${id}&permissions=0) ]**\n` })
    if (bots.length === 0) cont = "\```Oops! It seems like nobody applied a new bot!\```";

    let embed = new MessageEmbed()
      .setAuthor(`${message.author.tag} here is the botlist queue`, message.author.displayAvatarURL({ format: "png", size: 256 }))
      .setColor('ORANGE')
      .setDescription(cont)
    message.channel.send(embed)
  }
};