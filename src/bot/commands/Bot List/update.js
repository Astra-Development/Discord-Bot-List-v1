const { Command } = require('klasa');
const Bots = require("@models/bots");
const perms = require("@root/config.json");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      botPerms: ["SEND_MESSAGES"],
      description: "Update the bots in the server.",
    });
  }

  async run(message) {
    let m = await message.channel.send(`Updating bots.`);
    try {
      await this.update(message.client);
    } catch (e) { console.error(e) }
    m.edit(`${message.author}, All bots **Updated**`);
  }

  async update(client, message) {
    if (!perms.server.botreviewer.includes(message.author.id))
      return message.channel.send({
        embed: {
          color: 'RED',
          description: `${message.author}, You do not have enough permissions to run this command.`,
        }
      });
    let bots = await Bots.find({}, { _id: false })
    let updates = []
    for (let bot of bots) {
      let botUser = client.users.cache.get(bot.id);
      if (!botUser)
        updates.push({ updateOne: { filter: { botid: bot.id }, update: { state: "deleted", owners: { primary: bot.owners.primary, additional: [] } } } })
      if (bot.logo !== botUser.displayAvatarURL({ format: "png", size: 256 }))
        updates.push({ updateOne: { filter: { botid: bot.id }, update: { logo: botUser.displayAvatarURL({ format: "png", size: 256 }) } } });
      if (bot.username !== botUser.username)
        updates.push({ updateOne: { filter: { botid: bot.id }, update: { username: botUser.username } } })
    }
    await Bots.bulkWrite(updates)
    return true;
  }
};
