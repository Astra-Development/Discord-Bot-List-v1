const { Router } = require("express");
const sanitizeHtml = require('sanitize-html');
const { auth } = require("@utils/discordApi");
const checkFields = require('@utils/checkFields');
const Bots = require("@models/bots");
const { web: {domain_with_protocol}, server: {id} } = require("@root/config.json");
const { server } = require("@root/config.json");

const opts = {
    allowedTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img', 's', 'u'],
    disallowedTagsMode: 'discard',
    allowedAttributes: {
        a: [ 'href' ],
        img: [ 'src' ]
    },
    allowedSchemes: [ 'https' ]
}

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
