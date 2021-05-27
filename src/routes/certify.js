const { Router } = require("express");

const route = Router();

route.get("/", async (req, res) => {
    res.render("certify", {req})
});

module.exports = route;