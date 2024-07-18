const { SlashCommandBuilder } = require("discord.js");
const db = require('pro.db');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("afk")
    .setDescription("Set an Afk status shown when youre mentioned")
    .addStringOption(option => 
        option
        .setName("status")
        .setDescription('Message to set')
        .setRequired(false)),

    async execute(interaction) {
    const user = interaction.member;
    const reason = interaction.options.getString('status') || 'AFK'
    db.set(`AFK_${user.id}`, reason)
    user.setNickname(`[AFK]  ${user.user.username}`).then(() => {
    interaction.reply({content: `${user} You're now AFK with the Status: ${reason}`})
    }).catch(err => {
     interaction.reply({content: `Im Don't Have Permissions`, ephemeral: true})});
    }
}