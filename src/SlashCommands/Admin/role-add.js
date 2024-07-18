const { SlashCommandBuilder } = require("discord.js");

module.exports ={
    data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Role for member')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('select user')
        .setRequired(true))
        .addRoleOption(option =>
            option
            .setName('role')
            .setDescription('Select Role Give Member')
            .setRequired(true)),
            async execute(interaction) {
              if (!interaction.member.permissions.has("ManageRoles")) return interaction.reply({content:`**😕 You don't have permission **`, ephemeral: true})
              try {
                const role = interaction.options.getRole('role');
                const member = interaction.options.getMember('user');
                member.roles.add(role);
                await interaction.reply(`Done Give Role ${role} For ${member}`)
            }catch (err) {
  return interaction.reply({content: `The user is not available`, ephemeral: true })
  }
 }
}