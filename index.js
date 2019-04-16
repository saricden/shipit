const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

// Helperz
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.on('messageDelete', (message) => {
  const replies = [
    'A message has gone missing from our archives...\nThe plot thickens.',
    'Alert a Pylon has been deconstructed.',
    'A message went parachutting.',
    'A message got lost in the compiler.',
    'It was a DNS error. No, really!',
    'Welcome to Walmart get your shit and get out.',
    'Not saying a thing. :zipper_mouth:',
    'Someone stole the Secret Texts. :scroll:',
    'Someone stole the Sacred Texts. :scroll::scroll:',
    'Went to the beach. :beach_umbrella:',
    '418 I\'m a teapot! :tea:',
    'Hiding away in a castle! :european_castle:',
    'Hiding away in a forest castle. :japanese_castle:',
    'Went to market, oink oink! :pig:',
    'Message under construction. :construction:',
    'A little birdie talked too much. :bird:',
    'A message got lost in the winds. :dash:'
  ];
  const reply = replies[getRandomInt(0, (replies.length - 1))];

  message.channel.send(':warning: **__ALERT!__** :warning:\n'+reply);
});

client.on('ready', () => {
  let shoutedOut = false;

  client.channels.forEach((channel) => {
    if (channel.type === 'text' && !shoutedOut) {
      channel.send('Do not fear. I am here, start the party nao plz. <3');
      shoutedOut = true;
    }
  });
});

client.on('disconnect', () => {
  let shoutedOut = false;

  client.channels.forEach((channel) => {
    if (channel.type === 'text' && !shoutedOut) {
      channel.send('Sorry all, Kirk is tuggin my plug, looks like I gotta leave. See y\'all on the flipside! <3');
      shoutedOut = true;
    }
  });
});

client.on('message', msg => {
  let shipitTagged = false;

  msg.mentions.users.forEach((user) => {
    if (user.username === 'shipit') {
      shipitTagged = true;
    }
  });

  if (shipitTagged) {
    // const msgBits = msg.content.replace(/\s[A-z]=\".*+\"\s/g);
    let args = {};

    // msgBits.forEach((bit) => {
    //   console.log(bit);
    // });

    if (msg.content.match('!help')) {
      msg.reply('No problem, I gotchu.');
      msg.channel.send('**__COMMANDz GUIDE__**\n\n**!help**\n```\nThis command just tells you how to use the commands... So meta.\n```\n\n**!projects-init**\n```\nThis command will initialize your very own projects category if you don\'t already have one.\n```\n\n... Success.');
    }
    else if (msg.content.match('!projects-init')) {
      const {username} = msg.author;

      client.guilds.forEach((guild) => {
        if (guild.available) {
          let categoryExists = false;

          guild.channels.forEach((channel) => {
            if (channel.type === 'category' && channel.name === username) {
              categoryExists = true;
            }
          });
          
          if (!categoryExists) {
            msg.reply('Yay!! Welcome to the fam jam cuz!\nTry running my `!projects-add` command. If you get stuck, run `!help` anytime!');
            const categoryPromise = guild.createChannel(username, "category");
            const channelPromise = guild.createChannel('hello-world', 'text');

            Promise.all([categoryPromise, channelPromise]).then(([userCategory, helloChannel]) => {
              helloChannel.setParent(userCategory);
              helloChannel.send(':wave: <@'+msg.author.id+'>\n\nThis is an example project named `hello-world`. Do with it what you will, but remember, you\'re the one in charge here, so if you want to add other channels for real.. Non "hello world" projects, then... Do that.');
            });
          }
          else {
            msg.reply('Oopsie! It looks like you already have your own category.\nOne per member. Sarry.');
          }
        }
      });
    }
    else if (msg.content.match('!projects-add')) {

      console.log(args);

      // const slug = username.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      //                      .replace(/\s/g, '-')
      //                      .toLowerCase();
    }
  }
  if (msg.content === 'ping') {
    msg.channel.send('Pong!');
  }
});

client.login(process.env.discord_token);

// 1. Be able to parse commands
// 2. Command to create 'personal collection category'
// 3. Command to add project channels to user's category
// 4. Parameter to automagically add GitHub hook to project channel
// 5. Enable users to set topics in their own channels (&NSWF/SWF)


// @shipit [command_name] [params]
// !help
// !projects-init
// !projects-add n="GameName" d="Some long description about the game." l="https://yourcoolgame.games.game/index.html"