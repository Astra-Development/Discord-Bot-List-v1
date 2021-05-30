const { Router } = require("express");
const { MessageEmbed } = require("discord.js");
const { server } = require("@root/config.json");
const route = Router();

route.get("/", async (req, res) => {
        if(!server.website_logs){
          req.logout();
          res.redirect(`/`);
        }else{
        let embed = new MessageEmbed()
        .setAuthor(`${req.user.username}#${req.user.discriminator}`, `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=256`)
        .setColor('BLUE')
        .setThumbnail(`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=256`)
        .setDescription(`<@${req.user.id}>, Goodbye`);
        req.app.get('client').channels.cache.get(server.website_logs).send(embed)
            req.logout();
            res.redirect(`/`);
        }
});

module.exports = route;
