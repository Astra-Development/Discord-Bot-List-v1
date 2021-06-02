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
    data.long = sanitizeHtml(data.long, opts);
    const bot = await Bots.findOne({ botid: req.params.id }, { _id: false });

    // Backward compatability
    if (String(bot.owners).startsWith("["))
        bot.owners = {
            primary: String(bot.owners).replace("[ '", "").replace("' ]", "").split("', '")[0],
            additional: String(bot.owners).replace("[ '", "").replace("' ]", "").split("', '").slice(1)
        }

    let check = await checkFields(req, bot);
    if (!check.success) return res.json(check);

    let { long, description, invite, prefix, support, website, github, banner, donation, tags, webhook } = data;

    await Bots.updateOne({ botid: req.params.id }, {$set: { long, description, invite, prefix, support, website, github, banner, donation, tags, webhook, owners: { primary: bot.owners.primary, additional: check.users } } })
    req.app.get('client').channels.cache.get(server.mod_log_id).send(`<:db_edit:815581773039665163> <@${req.user.id}> has modified <@${bot.botid}>\n<${domain_with_protocol}/bots/${bot.botid}>`)
    return res.json({success: true, message: "Added bot", url: `/bots/${bot.botid}`})
});

module.exports = route;
