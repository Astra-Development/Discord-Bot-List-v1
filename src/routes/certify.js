const { Router } = require("express");
const { auth } = require('@utils/discordApi')
const Bots = require("@models/bots");
const { web: {recaptcha_v2: {site_key}}} = require("@root/config.json");

const route = Router();

route.get("/:id",auth, async (req, res) => {
  let bots = await Bots.findOne({botid: req.params.id})
    res.render("certify", {
      bots,
      req,
      site_key
    })
});

module.exports = route;