const { Router } = require("express");
const passport = require('passport');
const { MessageEmbed } = require("discord.js");
const { server } = require("@root/config.json");
const perms1 = require("@root/config.json");
const route = Router();

route.get("/", passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    if(!server.website_logs){
        res.redirect(req.session.url || "/me");
    }else{
        res.redirect(req.session.url || "/me");
        let embed = new MessageEmbed()
        .setAuthor(`${req.user.username}#${req.user.discriminator}`, `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=256`)
        .setColor('BLUE')
        .setThumbnail(`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=256`)
        .setDescription(`<@${req.user.id}>, Welcome to our Bot List!`);
        req.app.get('client').channels.cache.get(server.website_logs).send(embed)
    }

});

module.exports = route;
