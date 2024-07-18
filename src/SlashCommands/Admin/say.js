const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('to send something with bot')
    .addStringOption(Option => 
        Option
        .setName('message')
        .setDescription('the text you want to send with bot')
        .setRequired(true)),
        async execute(interaction) {
          if (!interaction.member.permissions.has("Administrator")) return interaction.reply({content:`**😕 You don't have permission **`, ephemeral: true})
            const txt = interaction.options.getString('message')
            await interaction.channel.send({content: `${txt}`})
            await interaction.reply({content: `Done Send Message`, ephemeral: true});
        }
}