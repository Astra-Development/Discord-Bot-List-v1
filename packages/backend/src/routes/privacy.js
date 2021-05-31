const { Router } = require("express");

const route = Router();

route.get("/", async (req, res) => {
    res.render("privacy", {req})
});

module.exports = route;