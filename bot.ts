import { Guild, GuildMember } from 'discord.js/typings';
import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.once('ready', () => console.log(`Logged in as ${client.user!.tag}.`));

// Emitted when the bot joins a server.
client.on('guildCreate', (guild: Guild) => {
});

// Emitted when a user joins a server.
client.on('guildMemberAdd', (member: GuildMember) => {
});

client.login(process.env.DISCORD_TOKEN);