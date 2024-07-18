const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick A Member From The Guild")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The Member to Kick")
        .setRequired(true)
    )
    .setDMPermission(false),
  async execute(interaction) {
    const member = interaction.options.getMember("user");

    if (!interaction.guild.members.me.permissions.has("KickMembers"))
      return interaction.reply({
        content: `:no_entry: | ${interaction.user.username}, I don't have **KickMembers** Permission`,
      });
    if (member.user.id === interaction.member.user.id)
      return interaction.reply({
        content: `**:rolling_eyes: -  You can't kick ${User.user.username}.**`,
      });
    if (
      interaction.member.roles.highest.position <=
        member.roles.highest.position &&
      interaction.guild.ownerId !== interaction.member.id
    )
      return interaction.reply({
        content: `**:rolling_eyes: -  You can't kick ${member.user.username}.**`,
      });
    if (
      interaction.guild.members.me.roles.highest.position <=
      member.roles.highest.position
    )
      return interaction.reply({
        content: `**:rolling_eyes: -  I can't kick ${member.user.username}.**`,
      });

    await interaction.guild.members.kick(member.id).then(() => {
      interaction.reply({
        content: `**:white_check_mark: ${member.user.username} has been kicked.**`,
      });
    });
  },
};