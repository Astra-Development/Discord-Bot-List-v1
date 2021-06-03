const { Command } = require('klasa');
const Bots = require("@models/bots");
const perms = require("@root/config.json");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["nsfw", "toggle-nsfw", "togglensfw"],
      usage: "[User:user]",
      description: "Mark bots as NSFW."
    });
  }

  async run(message, [user]) {
    if (!perms.server.botreviewer.includes(message.author.id))
      return message.channel.send({
        embed: {
          color: 'RED',
          description: `> you do not have enough permissions to run this command.`,
        }
      });
    if (!user || !user.bot) return message.channel.send(`You didn't ping a bot to mark as **NSFW**`);
    let bot = await Bots.findOne({ botid: user.id });

    if (bot === null)
      return message.channel.send({
        embed: {
          color: 'RED',
          description: `this bot is not on our botlist`,
        }
      });
    await Bots.updateOne({ botid: user.id }, { $set: { nsfw: !bot.nsfw } })
    message.channel.send(`<:db_verified:826375752840249365> \`${user.tag}\` Marked as an ${bot.nsfw ? "not " : ""}**NSFW**`)
  }
};