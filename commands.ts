import { REST } from "@discordjs/rest";
import { Routes, APIApplicationCommandOption } from "discord-api-types/v9";
import { CommandInteraction } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

export interface Command {
  data: {
    name: string;
    description: string;
    options: APIApplicationCommandOption[];
  };
  execute: (interaction: CommandInteraction) => Promise<void>;
}

if (!process.env.DISCORD_TOKEN) {
  throw new Error("Must define DISCORD_TOKEN in .env file.");
}

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

const commandFiles = fs
  .readdirSync("./build/commands")
  .filter((file) => file.endsWith(".js")); // .js because .ts is compiled into .js files
export const commands: Command[] = [];
for (const commandFile of commandFiles) {
  commands.push(require(`./commands/${commandFile}`).command);
}

export async function registerCommands() {
  if (!process.env.DISCORD_CLIENT_ID) {
    throw new Error(
      "Must define DISCORD_CLIENT_ID in .env file to register commands."
    );
  }

  try {
    console.log("Refreshing application (/) commands...");

    const commandData = commands.map((command) => command.data);
    if (process.env.DEV_MODE) {
      if (!process.env.DEV_GUILD_ID) {
        throw new Error(
          "Must define DEV_GUILD_ID in .env file to register commands while in development mode."
        );
      }

      await rest.put(
        Routes.applicationGuildCommands(
          process.env.DISCORD_CLIENT_ID,
          process.env.DEV_GUILD_ID
        ),
        { body: commandData }
      );
    } else {
      await rest.put(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
        { body: commandData }
      );
    }

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.log("Failed to reload the application (/) commands:");
    console.error(error);
  }
}
