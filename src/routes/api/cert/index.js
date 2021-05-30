const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const { MessageEmbed } = require("discord.js");
const Bots = require("@models/bots");
const checkFields = require('@utils/checkFields');
const { server } = require("@root/config.json");

const route = Router();

route.patch("/:id", auth, async (req, res) => {
    let data = req.body;
    
    const bot = await Bots.findOne({ botid: req.params.id }, { _id: false });
    let check = await checkFields(req, bot);
    if (!check.success) return res.json(check);
    let { certlong } = data;
    let embed = new MessageEmbed()
    .setTitle('New Certification Request')
    .setColor('BLUE')
    .addField('User', `<@${req.user.id}>`)
    .addField('Why Should we certify your bot ?', certlong)
    .addField('Bot', `<@${bot.botid}>`);
    await Bots.updateOne({ botid: req.params.id }, {$set: { certlong } })
    req.app.get('client').channels.cache.get(server.mod_log_id).send(embed)
    return res.json({ success: true })
});

module.exports = route;
