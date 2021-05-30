const { Router } = require("express");
const passport = require('passport');
const { MessageEmbed } = require("discord.js");
const { server } = require("@root/config.json");
const route = Router();

route.get("/", passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    
    res.redirect(req.session.url || "/me");
    let embed = new MessageEmbed()
    .setTitle('login detected')
    .setColor('BLUE')
    .addField('User logged in', `<@${req.user.id}>`);
    req.app.get('client').channels.cache.get(server.website_logs).send(embed)
});

module.exports = route;
