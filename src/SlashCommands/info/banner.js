const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require('axios')
module.exports = {
  data: new SlashCommandBuilder()

  .setName('banner')
  .setDescription('Gat a user banner')
  .addUserOption(option => 
                option
                .setName('user')
                .setDescription('Select User')
                .setRequired(true))
                .setDMPermission(false),

  async execute(interaction) {
let member = interaction.options.getUser('user') || interaction.member;
    if (!member) return interaction.channel.send(`please mention the user or get ID `)
    let banner = false;
    await member.fetch().then(member => {
      if (member.banner) {
        banner = member.bannerURL({ dynamic: true, size: 1024 })
      }
    })
    if (banner === false) return interaction.reply({content: `** ❌ \`${member.username}\` • don't have banner**`, ephemeral: true});
    let embed = new EmbedBuilder()
      .setTitle(`${member.username} banner`)
      .setImage(`${banner}`)
      .setColor('Random')
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: 
      `${interaction.user.displayAvatarURL()}` })
      .setTimestamp()
    interaction.reply({embeds: [embed], ephemeral: true })
  }
}