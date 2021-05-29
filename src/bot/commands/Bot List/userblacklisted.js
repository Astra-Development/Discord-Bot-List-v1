const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");
const Users = require("@models/users");
const { server: { mod_log_id, role_ids, admin_user_ids} } = require("@root/config.json");
var modLog;

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'userblacklist',
            runIn: ['text'],
            description: "to blacklist a user",
            usage: '[userblacklist:user-id]'
        });
    }

    async run(message, args) {

    await Users({ userid: args[1]}, { $push: { blacklisted: false } });
    console.log(args[1])
    message.channel.send(`${args[1]} has been blacklisted.`)
    }
    
};