async function BuildIndex() {
  const { Client, GatewayIntentBits } = require("discord.js");
  const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
  });
  module.exports.Client = client;

//----------- 
  const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//----  
    const prefix = '!'; // قم بتغيير البريفكس حسب حاجتك
//------------
  //الخط الرئيسي-خطوط
  let mhm_channel = ['ايدي روم','ايدي روم1'];
let line = `صوره`
client.on('messageCreate', async message => {
  if (message.channel.type === "DM" || message.author.bot) return;
  if (mhm_channel.includes(message.channel.id)) {
    message.channel.send({ files: [line] });
  }
});
//خط البارتنر-خطوط
 let partnar_channel = ['ايدي روم'];
let linep = `خط`
client.on('messageCreate', async message => {
  if (message.channel.type === "DM" || message.author.bot) return;
  if (partnar_channel.includes(message.channel.id)) {
    message.channel.send({ files: [linep] });
  }
});
//خط قيف اويات-خطوط
 let giv_channel = ['ايدي روم'];
let givl = `حط`
client.on('messageCreate', async message => {
  if (message.channel.type === "DM" || message.author.bot) return;
  if (giv_channel.includes(message.channel.id)) {
    message.channel.send({ files: [givl] });
  }
});
//خط اداره-خطوط
 let staf_channel = ['ايدي روم'];
let stafl = `خط`
client.on('messageCreate', async message => {
  if (message.channel.type === "DM" || message.author.bot) return;
  if (staf_channel.includes(message.channel.id)) {
    message.channel.send({ files: [stafl] });
  }
});  
//--------  
//--------  
  //ردود تلقائيه
const warningMessage = "**وعليكم السلام ورحمة الله وبركاته نورتنا**";

client.on('messageCreate', (message) => {
    if (!message.author.bot) {
        if (message.content.toLowerCase().includes('سلام عليكم')) {
            message.reply(warningMessage);
        }
    }
});
  
  
    const warnig = "<:emoji_34:1205591291543691285> كل زقين";

client.on('messageCreate', (message) => {
    if (!message.author.bot) {
        if (message.content.toLowerCase().includes('كل زق')) {
            message.reply(warnig);
        }
    }
});
  
  client.on('messageCreate', message => {
    if (!message.author.bot && message.guild && message.content.toLowerCase() === 'باك') {
        message.reply('**ولكم ||بس السلام؟||**');
    }
});
  //------------------
  client.on("messageCreate", async message =>{
if(message.content.startsWith(prefix+"setavatar")){
if(!message.member.permissions.has("ADMINISTRATOR"))return;
// V14 => if(!message.member.permissions.has(Discord.PermissionFlagsBits.Administrator))return;
let avatar = message.attachments.first().url
if(!avatar) return message.channel.send({content:"ارفع صوره"})
client.user.setAvatar(avatar)

message.channel.send({content:"Avatar Changed"})
}
})
  //---------
  
  client.on('messageCreate', async message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'مسح') {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('ليس لديك صلاحية لحذف الرسائل.');
    }

    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0 || amount > 100) {
      return message.reply('يرجى إدخال عدد صحيح بين 1 و 100 لحذف الرسائل.');
    }

    const messages = await message.channel.messages.fetch({ limit: amount });
    await message.channel.bulkDelete(messages).catch(err => {
      console.error(err);
      message.channel.send('حدث خطأ أثناء محاولة حذف الرسائل.');
    });
  }
});
//-------------------

const activities = [
  {
    type: 0, // .0لحالة اللعب
    name: "https://discord.gg/Bjgwm4789f",
  },
  {
    type: 0, // .2لحالة الاستماع
    name: "رمضان كريم يابن عمي",
  },
  {
    type: 0, // .3لحالة البث
    name: "back? 🔥",
  },
  {
    type: 0, // .1لحالة المشاهدة
    name: "صل على النبي",
  
  },
];

client.once('ready', () => {
  setInterval(() => {
    // اختيار حالة عشوائية من بين الحالات المعرفة
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
  
    client.user.setPresence({
      activities: [randomActivity],
    });
  }, 5000); // تحديث الحالة كل 5 ثوانٍ (5000 ميلي ثانية)
  
  console.log('Online :)');
});


    //--------------------
  
  
  //--------------------
  
  const targetedChannels = ['1166081491814592533','1168620687204819105']; // قم بتعديل هذه القائمة لتحديد الرومات المستهدفة


client.on('messageCreate', async (message) => {
    // التحقق مما إذا كانت الرسالة مرسلة في أحد الرومات المستهدفة
    if (targetedChannels.includes(message.channelId)) {
        // التحقق مما إذا كانت الرسالة ليست تحتوي على مرفقات (صور أو فيديوهات)
        if (message.attachments.size === 0) {
            // إذا كانت الرسالة لا تحتوي على مرفقات، قم بحذفها
            try {
                await message.delete();
                console.log(`Deleted message from ${message.author.tag} in ${message.guild.name}`);
            } catch (error) {
                console.error('Error deleting message:', error);
            }
        }
    }
});


const channelEmojis = {
'1166081491814592533': ['😹','🤢'],
    '1168620687204819105': ['<:like:1220067893442773062>', '<:dislike:1220067890879791169>']

};

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
    const channelId = message.channelId;

    if (channelEmojis[channelId]) {
        const emojisToReact = channelEmojis[channelId];

        for (const emojiCode of emojisToReact) {
            try {
                await message.react(emojiCode);
            } catch (error) {
                console.error(`Error with ${emojiCode}: ${error}`);
            }
        }
    }
});
  
  
  //--------------------
  const { joinVoiceChannel } = require('@discordjs/voice');


client.on('ready', async () => {
    console.log(`تم الدخول!`);

    // احدث قائمة القنوات والمطلوب الانضمام إليها
    const channelId = "الروم المحدد";

    // الحصول على القناة من ال client
    const channel = await client.channels.fetch(channelId);

    // انضمام إلى القناة الصوتية
    const voiceConnection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
    });

    // اختبار اذا كان الانضمام ناجحاً
    voiceConnection.on('stateChange', (oldState, newState) => {
        if (newState.status === 'ready') {
            console.log(`Joined voice channel ${channel.name}!`);
        } else if (newState.status === 'disconnected') {
            console.log(`Left voice channel ${channel.name}!`);
        }
    });

    // يتم استدعاء هذا الحدث عندما يتم فصل الروبوت عن القناة الصوتية
    voiceConnection.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });
});
  //---------------------------
  



  const { Run } = require('./functions/Build')
  Run(client)

  client.login(process.env.TOKEN);

  process.on("uncaughtException", (error) => {
    return console.error(error);
  });

  process.on("uncaughtExceptionMonitor", (error) => {
    return console.error(error);
  });

  process.on("unhandledRejection", (error) => {
    return console.error(error);
  });

  process.on("rejectionHandled", (error) => {
    return console.error(error);
  });
}



module.exports = { BuildIndex };
