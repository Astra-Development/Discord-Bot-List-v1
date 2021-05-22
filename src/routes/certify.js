const { Router } = require("express");
const { auth } = require('@utils/discordApi');
const Bots = require("@models/bots");

const { web: {recaptcha_v2: {site_key}}, bot_options: {bot_tags, max_bot_tags} } = require("@root/config.json");

const route = Router();

route.get("/",auth, async (req, res) => {
    let theme = "light";
    if (req.cookies["theme"] === "dark") theme = "dark"
    let bots = await Bots.find({}, { _id: false })

    bots = bots.filter(bot => {
        // Backward compaitibility
        let owners = [bot.owners.primary].concat(bot.owners.additional)
        if (String(bot.owners).startsWith("["))
            owners = String(bot.owners).replace("[ '", "").replace("' ]", "").split("', '")
        return owners.includes(req.user.id)
    })
    if (bots == '') 
    bots = null

    res.render("certify", {req, tags: bot_tags, count: max_bot_tags, bots: bots, theme, site_key})
});

module.exports = route;