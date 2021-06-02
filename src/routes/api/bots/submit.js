const { Router } = require("express");
const { auth } = require('@utils/discordApi');
const checkFields = require('@utils/checkFields');
const sanitizeHtml = require('sanitize-html');
const Bots = require("@models/bots");
const { web: {domain_with_protocol}, server: {id} } = require("@root/config.json");
const { server } = require("@root/config.json");

const opts = {
    allowedTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img', 's', 'u' ],
    disallowedTagsMode: 'discard',
    allowedAttributes: {
        a: [ 'href' ],
        img: [ 'src' ]
    },
    allowedSchemes: [ 'https' ]
}

const route = Router();

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

route.post("/:id", auth, async (req, res) => {
    let resubmit = false;
    let check;

    try {
        check = await checkFields(req);
        if (!check.success) return res.json(check);
    } catch (e) {
        return res.json({ success: false, message: "Unknown error" })
    }
    let { bot, users } = check;
    let data = req.body;
    data.long = sanitizeHtml(data.long, opts)
    let owners = {
        primary: req.user.id,
        additional: users
    };

    let original = await Bots.findOne({ botid: req.params.id });
    if (original && original.state !== "deleted")
        return res.json({ success: false, message: "Your bot already exists on the list.", button: { text: "Edit", url: `/bots/edit/${bot.id}` } });
    else if (original && original.state == "deleted") resubmit = true;

    if (resubmit) {
        await Bots.updateOne({ botid: req.params.id }, {
            username: bot.username,
            invite: data.invite,
            description: data.description,
            long: data.long,
            prefix: data.prefix,
            state: "unverified",
            support: data.support,
            website: data.website,
            banner: data.banner,
            donation: data.donation,
            github: data.github,
            tags: data.tags,
            note: data.note,
            owners
        });
    } else {
        new Bots({
            username: bot.username,
            botid: req.params.id,
            logo: `https://cdn.discordapp.com/avatars/${req.params.id}/${bot.avatar}.png?size=256`,
            invite: data.invite,
            description: data.description,
            long: data.long,
            prefix: data.prefix,
            state: "unverified",
            support: data.support,
            website: data.website,
            banner: data.banner,
            donation: data.donation,
            github: data.github,
            tags: data.tags,
            note: data.note,
            owners
        }).save();
    }
    try {
          await req.app.get('client').channels.cache.find(c => c.id === server.mod_log_id).send(`<:db_add:816717375331631124> <@${req.user.id}> ${resubmit ? "re-" : ""}added unverified bot <@${req.params.id}>: <@&${server.role_ids.bot_verifier}>\n<${domain_with_protocol}/bots/${req.params.id}>`);
        return res.json({ success: true, message: "Your bot has been added" })
    } catch (e) {
        return res.json({ success: true, message: "Your bot has been added" })
    }
});

module.exports = route;
