import { Client, Intents } from "discord.js";
import { registerCommands, commands } from "./commands";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

client.once("ready", () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}.`);
    registerCommands();
  } else {
    console.log("Logged in, but user is not defined. Stopping...");
    client.destroy();
  }
});

// Emitted when a user joins a server.
client.on("guildMemberAdd", (member) => {});

// Emitted when a user makes an interaction with the bot.
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  for (const command of commands) {
    if (interaction.commandName === command.data.name) {
      await command.execute(interaction);
      break;
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
