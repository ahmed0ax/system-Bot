const { ChatInputCommandInteraction, Client, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'lock',
    description: '.لـقفل روم كـتابي',
    options: [
        {
            name: "channel",
            description: ".قم بمنشن الروم الذي تود قفلة",
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

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ content: `🔴 - *_!ليس لديك صلاحيات لـ إستخدام هذا الأمر_*`, ephemeral: true });
        if (channel) {
            await channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: false })
            await interaction.reply({ content: `🔒 - *.تم قفل <#${channel.id}> بنجاح*` })
        } else {
            await interaction.channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: false })
            await interaction.reply({ content: `🔒 - *.تم قفل <#${interaction.channel.id}> بنجاح*` })
        }
    },
};