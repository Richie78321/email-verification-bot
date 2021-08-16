import { Guild, GuildMember } from 'discord.js/typings';
import { Client, Intents } from 'discord.js';
import { registerCommands } from './commands';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.once('ready', () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}.`);
    registerCommands();
  } else {
    console.log('Logged in, but user is not defined. Stopping...');
    client.destroy();
  }
});

// Emitted when the bot joins a server.
client.on('guildCreate', (guild: Guild) => {
});

// Emitted when a user joins a server.
client.on('guildMemberAdd', (member: GuildMember) => {
});

client.login(process.env.DISCORD_TOKEN);