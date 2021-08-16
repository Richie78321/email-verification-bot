import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DISCORD_TOKEN) {
  throw new Error("Must define DISCORD_TOKEN in .env file.");
}

const commands = [{
  name: 'verify',
  description: 'Request email verification',
}];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

export async function registerCommands() {
  if (!process.env.DISCORD_CLIENT_ID) {
    throw new Error("Must define DISCORD_CLIENT_ID in .env file to register commands.");
  }

  try {
    console.log('Refreshing application (/) commands...');

    if (process.env.DEV_MODE) {
      if (!process.env.DEV_GUILD_ID) {
        throw new Error("Must define DEV_GUILD_ID in .env file to register commands while in development mode.");
      }    

      await rest.put(
        Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DEV_GUILD_ID),
        { body: commands },
      );
    } else {
      await rest.put(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
        { body: commands },
      );
    }

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.log('Failed to reload the application (/) commands:');
    console.error(error);
  }
}