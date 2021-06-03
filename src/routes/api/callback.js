const { Router } = require("express");
const passport = require('passport');
const { MessageEmbed } = require("discord.js");
const { server } = require("@root/config.json");
const perms1 = require("@root/config.json");
const { web: { domain_with_protocol } } = require("@root/config.json");
const route = Router();

route.get("/", passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
  if(!server.website_logs){
        res.redirect("/me");
    }else{
        res.redirect("/me");
    let embed = new MessageEmbed()
    .setAuthor(`${req.user.username}#${req.user.discriminator}`, `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}`, `${domain_with_protocol}/user/${req.user.id}`)
    .setColor('#4d79ff')
    .setThumbnail(`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}`)
    .setDescription(`<@${req.user.id}> (${req.user.id}), Welcome to our Bot List!`)    
    req.app.get('client').channels.cache.get(server.website_logs).send(embed)
  }
});

module.exports = route;
