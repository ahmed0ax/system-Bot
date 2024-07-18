const { ChatInputCommandInteraction, Client, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'unlock',
    description: '.لـفتح روم كـتابي',
    options: [
        {
            name: "channel",
            description: ".قم بمنشن الروم الذي تود فتحة",
            type: ApplicationCommandOptionType.Channel,
            required: false
        }
    ],
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const channel = interaction.options.getChannel("channel");

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ content: `🔴 - **__!ليس لديك صلاحيات لـ إستخدام هذا الأمر__**`, ephemeral: true });
        if (channel) {
            await channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: true })
            await interaction.reply({ content: `🔓 - **.تم فتح <#${channel.id}> بنجاح**` })
        } else {
            await interaction.channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: true })
            await interaction.reply({ content: `🔓 - **.تم فتح <#${interaction.channel.id}> بنجاح**` })
        }

    },
};