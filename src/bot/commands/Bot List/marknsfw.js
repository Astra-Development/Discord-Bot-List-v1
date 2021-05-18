const { Command } = require('klasa');
const Bots = require("@models/bots");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["nsfw", "toggle-nsfw", "togglensfw"],
            permissionLevel: 8,
            usage: "[User:user]",
            description: "Mark bots as NSFW."
        });
    }

    async run(message, [user]) {
        if (!user || !user.bot) return message.channel.send(`You didn't ping a bot to mark as **NSFW**`);
        let bot = await Bots.findOne({botid: user.id});
        await Bots.updateOne({ botid: user.id }, {$set: { nsfw: !bot.nsfw } })
        message.channel.send(`<:db_verified:826375752840249365> \`${user.tag}\` Marked as an ${bot.nsfw ? "not " : ""}**NSFW**`)
    }
};