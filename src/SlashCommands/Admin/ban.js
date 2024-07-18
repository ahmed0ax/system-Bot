const { SlashCommandBuilder, Interaction, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {//https://discord.gg/bRRCkmPDFm
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Command to ban a member')
        .setDMPermission(false)


        .addUserOption(user => user
            .setName('user')
            .setDescription('Mention the user you want to ban')
            .setRequired(false)
        )

        .addStringOption(reason => reason
            .setName('reason')
            .setDescription('Reason for banning the member')
            .setRequired(false)
        )
    ,

    /**
    * @param { Interaction } interaction 
    * @param { Client } client 
    */

    async execute(interaction, client) {
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        const channel = interaction.guild.channels.cache.get('channel_id');

        if (!interaction.member.permissions.has(PermissionFlagsBits.BAN_MEMBERS)) {
            return interaction.reply({ content: 'You do not have permission to ban members.' });
        }

        if (!channel) {
            return interaction.reply({ content: 'Invalid channel ID.' });
        }

        if (!member) {
            return interaction.reply({ content: 'Please provide a valid member to ban.' });
        }

        if (member.id === interaction.user.id) {
            return interaction.reply({ content: 'You cannot ban yourself.' });
        }

        if (member.id === client.user.id) {
            return interaction.reply({ content: 'You cannot ban me.' });
        }

        try {
            await member.ban({ reason: reason || 'No reason provided.' });

            const embed = new EmbedBuilder()
                .setDescription(`
              > **User** | ${member} (${member.id})
              > **Reason** | ${reason || 'No reason provided.'}
              > **Moderator** | ${interaction.user} (${member.id})
            `);

            await channel.send({ embeds: [embed] });
            return await interaction.reply({ content: `${member} has been banned.` });
        } catch (error) {
            return await interaction.reply({ content: `An error occurred while trying to ban ${member}. Error: \`\`\`${error}\`\`\`` });
        }
    }
}