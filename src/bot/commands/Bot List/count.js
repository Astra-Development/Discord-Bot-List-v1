const { Command } = require('klasa');
const Bots = require("@models/bots");
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'count',
      runIn: ['text'],
      permLevel: 0,
      botPerms: ["SEND_MESSAGES"],
      requiredSettings: [],
      description: "Check how many bots there are in the list."
    });
  }

  async run(message) {
    let bots = await Bots.find({}, { _id: false })
    bots = bots.filter(bot => bot.state !== "deleted");
    if (bots.length === 1) cont = "\```Ohh noo... Only [1] bot is in our botlist";

    let embed = new MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: "png", size: 256 }))
      .setColor('ORANGE')
      .setDescription(`**:arrow_right: Bot Count: ** \`${bots.length}\``)
    message.channel.send(embed)
  }
};
