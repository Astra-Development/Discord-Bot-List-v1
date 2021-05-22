const { Router } = require("express");
const Bots = require("@models/bots")
const bots = require("@routes/bots/index");
const tag = require("@routes/tag/index");
const api = require("@routes/api/index");
const theme = require("@routes/theme");

const route = Router();

route.use("/bots", bots);
route.use("/tag", tag);
route.use("/api", api);
route.use("/theme", theme);

route.get('/', async (req, res) => {
  let certifiedbots = await Bots.find({certify: true}, { _id: false, auth: false, __v: false, addedAt: false })
  certifiedbots.sort((a, b) => b.likes - a.likes);
    if (certifiedbots == '') {
        certifiedbots = null
    }
    if (!req.query.q) res.render('index', {req, bots: certifiedbots});
    else res.redirect(`/bots/search?q=${encodeURIComponent(req.query.q)}`)
});

module.exports = route;
