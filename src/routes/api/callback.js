const { Router } = require("express");
const passport = require('passport');
const { Command } = require('klasa');
const { MessageEmbed } = require("discord.js");
const { server } = require("@root/config.json");
const route = Router();

route.get("/", passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    
    res.redirect(req.session.url || "/me");
    let embed = new MessageEmbed()
    .setTitle('Login Detected')
    .setThumbnail(req.user.avatarURL)
    .setColor('BLUE')
    .addField('User logged in', `<@${req.user.id}>`);
    req.app.get('client').channels.cache.get(server.website_logs).send(embed)
});

module.exports = route;