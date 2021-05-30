const { Router } = require("express");
const { auth } = require('@utils/discordApi')
const Bots = require("@models/bots");

const route = Router();

route.get("/", auth, async (req, res) => {
    res.render("certify", {req})
});

module.exports = route;