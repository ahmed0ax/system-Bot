const { SlashCommandBuilder } = require("discord.js");

module.exports ={
    data: new SlashCommandBuilder()
    .setName('role-remove')
    .setDescription('Remove Role for member')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('select user')
        .setRequired(true))
        .addRoleOption(option =>
             option
            .setName('role')
            .setDescription('Select Role Remove Member')
            .setRequired(true)),
            async execute(interaction) {
              if (!interaction.member.permissions.has("ManageRoles")) return interaction.reply({content:`**😕 You don't have permission **`, ephemeral: true})
                const role = interaction.options.getRole('role');
                const member = interaction.options.getMember('user');
                member.roles.remove(role);              
                await interaction.reply(`Done Remove Role ${role} For ${member}`)
  }
}