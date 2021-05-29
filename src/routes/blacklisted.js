const { Router } = require("express");

const route = Router();

route.get("/", async (req, res) => {
    res.render("blacklisted", {req})
});

module.exports = route;