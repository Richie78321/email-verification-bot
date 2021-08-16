import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Command } from '../commands';

export const command: Command = {
  data: new SlashCommandBuilder().setName('verify').setDescription('Verify your email in the server.').toJSON(),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply({ content: 'Check your DMs.', ephemeral: true });
  },
}