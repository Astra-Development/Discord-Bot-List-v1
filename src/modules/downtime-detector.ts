import { MessageEmbed, TextChannel } from 'discord.js';
import { bot } from '../bot';
import { SavedBot } from '../data/models/bot';

const { server: {DOWNTIME_CHANNEL_ID, DOWNTIME_CHANNEL_ID} } = require("@root/config.json");

export class DowntimeDetector {
  log = new Map<string, BotDowntime>();
  
  constructor() {
    const oneMinute =  1 * 60 * 1000;
    setInterval(() => this.checkBots(), oneMinute);
  }

  async checkBots() {
    const savedBots = await SavedBot.find();
    for (const { id, ownerId } of savedBots) {
      const botUser = bot.guilds.cache
        .get(process.env.GUILD_ID)?.members.cache
        .get(id);
      if (!botUser) continue;

      const isOffline = botUser.presence.status === 'offline';
      const log = this.log.get(id);

      if (isOffline && !log)
        this.log.set(id, { since: new Date(), logged: false });
      else if (!isOffline)
        this.log.delete(id);

      if (log && this.hasBeen15Mins(log.since) && !log.logged) {
        log.logged = true;
        await this.logLongDowntime(botUser.user.username, ownerId);
      }
    }
  }

  private async hasBeen15Mins(since: Date) {
    const timeGapMs = new Date().getTime() - since.getTime();
    const fifteenMinsMs = 15 * 60 * 1000;
    return timeGapMs > fifteenMinsMs;
  }

  private async logLongDowntime(botUsername: string, ownerId: string) {
    const channelId = process.env.DOWNTIME_CHANNEL_ID;
    const channel = bot.channels.cache.get(channelId) as TextChannel;
    await channel?.send(
      new MessageEmbed()
        .setTitle('Bot Offline')
        .setDescription(`<@!${ownerId}>, your bot \`${botUsername}\` has been offline for over 15 minutes.`)
    );
  }
}

interface BotDowntime {
  logged: boolean;
  since: Date;
}