const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js")
const { default: axios } = require('axios'); // لا تنسى تحمله npm install axios


module.exports = {
    data: new SlashCommandBuilder()
    .setName("addemoji")
    .setDescription("إضافة إموجي عن طريق أمر ")
    .addStringOption(option => option.setName('emoji').setDescription('الإموجي الي تبيه تضيفه').setRequired(true))
    .addStringOption(option => option.setName('name').setDescription('أسم الإموجي').setRequired(true))
    .setDMPermission(false),

    async execute(interaction) {
        try {

        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("SendMessages"))) return interaction.reply({ content: "**SendMessages** لا امتلك صلاحية إرسال رسائل الرجاء المحاولة بعد إعطائي الصلاحية", ephemeral: true })
        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("ManageEmojisAndStickers"))) return interaction.reply({ content: "**BanMembers** لا امتلك صلاحية التعديل على الإموجي  الرجاء المحاولة بعد إعطائي الصلاحية", ephemeral: true })

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) return interaction.reply({ content: "لا تمتلك صلاحية التعديل على الإموجي  الرجاء المحاولة بعد اعطائك الصلاحية **ManageEmojisAndStickers**", ephemeral: true })


        let emoji = interaction.options.getString('emoji')?.trim();
        const name = interaction.options.getString('name');

        if (emoji.startsWith("<") && emoji.endsWith(">")) {
            const id = emoji.match(/\d{15,}/g)[0];

        const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
        .then(image => {
            if (image) return "gif"
            else return "png"
        }).catch(err => {
            return "png"
        })

            emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
    }
            if (!emoji.startsWith("https")) {
                return await interaction.reply({ content: "لا يمكنك احذ ايوجي من الدسكورد نفسه", ephemeral: true})
            }
            if (!emoji.startsWith("http")) {
                return await interaction.reply({ content: "لا يمكنك احذ ايوجي من الدسكورد نفسه", ephemeral: true })
            }
            interaction.guild.emojis.create({ attachment: `${emoji}`, name: `${name}` })
            .then(emoji => {
                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`اضاف ${emoji} بأسم ${name}`)

                return interaction.reply({ embeds: [embed] });
            })

            } catch (error) {
                console.log(error)
                interaction.reply({ content: "حدث خطأ الرجاء مراجعة الدعم الفني"  })
        }
    }


}
