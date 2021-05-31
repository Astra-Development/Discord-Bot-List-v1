const { Router } = require("express");
const fetch = require("node-fetch");
const { auth } = require("@utils/discordApi");
const Bots = require("@models/bots");
const Users = require("@models/users");
const { server } = require("@root/config.json");
const { web: {domain_with_protocol}, server: {id} } = require("@root/config.json");

const route = Router();

route.patch("/:id", auth, async (req, res) => {
  let user = await Users.findOne({ userid: req.user.id })
  if (user && (Date.now() - user.time) < 43200000) 
    return res.json({success: false, time: Date.now() - user.time})

  let bot = await Bots.findOneAndUpdate({ botid: req.params.id }, { $inc: { likes: 1 } })
  await Users.updateOne({ userid: req.user.id }, { $set: { time: Date.now(), botliked: req.params.id } }, { upsert: true })

  let userProfile = await req.app.get('client').users.fetch(req.user.id);
  
  // Discord Webhook
  let channel = await req.app.get('client').channels.cache.get(server.like_log);
  let webhook = (await channel.fetchWebhooks()).first();
  if (!webhook) 
    webhook = await channel.createWebhook('Astra Vote')
  await webhook.send(`<:vote:839818624411500554> ${userProfile.tag} voted for <@${req.params.id}>\n<${domain_with_protocol}/bots/like/${req.params.id}>`);

  // Custom webhook
  if (bot.webhook) {
    fetch(bot.webhook, {
      method: "POST",
      body: JSON.stringify({
        type: "like",
        bot: req.params.id,
        user: req.user.id,
        timestamp: new Date()
      }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return res.json({ success: true })
});

module.exports = route;
