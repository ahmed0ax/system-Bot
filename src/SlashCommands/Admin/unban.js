const { SlashCommandBuilder,PermissionFlagsBits } = require("discord.js");

module.exports ={
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Un Ban for members .')
    .addUserOption(option => 
        option 
        .setName('target')
        .setDescription('Select User Unban')
        .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
            .setDMPermission(false),

            async execute(interaction) {

            const user = interaction.options.getUser('target')
            interaction.guild.bans.fetch().then(async bans => {
                if(bans.size === 0) return interaction.reply("No one is banned in this server")
            let unbanned = bans.find(ban => ban.user.id === userId)
            if (!unbanned) return interaction.reply('user dont hav ban')
            interaction.guild.members.unban(user).catch(err => {
                return interaction.reply('Find')
            })
            interaction.reply(`done unbanned ${user}`)
        })        
        }
        }