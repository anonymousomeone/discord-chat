// Require the necessary discord.js classes
const { Client } = require('discord.js');
const { token, prefix } = require('./config.json');
const readline = require('readline');
var colors = require('colors');

// Create a new client instance
const client = new Client();

const consol = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// variables :WEARYYYYYYY:
var currChannel = '838630602403086397'
var currGuild = '825144985484787772'

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(colors.cyan('Ready! Do !help for commands.'));
});

client.on('message', async message => {
  if (message.author == client.user) {return;}
  if (message.channel.id == currChannel) {
    var log = message.author.tag +': ' +(message.content).toString();
    console.log(colors.green(log));
  }
});

function sendMessage(message, channelid) {
  var channel = client.channels.cache.get(currChannel);
  channel.send(message)
};

function commands(msg) {
  const args = msg.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

  if (command == "servers") { client.guilds.cache.forEach(guild => { console.log(`${guild.name} | ${guild.id}`) }) }

  else if (command == "channels") { client.channels.cache.forEach(channel => { 
    if (channel.guild.id == currGuild) { 
      if (channel.permissionsFor(client.user.id).has(['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'])) { 
        if (channel.type == 'category') { console.log(colors.blue(channel.name)) } else if (channel.type == 'voice') { 
        console.log(colors.red('🔊 ' + channel.name)) 
      }
        else { if (channel.id == currChannel) { console.log(colors.green('> ' + channel.name)) } else {console.log(colors.green(channel.name)) }} 
      }
        else if (channel.type == 'category') { console.log(colors.blue('🔒 ' + channel.name)) } 
        else { console.log(colors.red('🔒 ' + channel.name)) };
    }
    })
  }
  
  else if (command == "refresh") {
    var channel = client.channels.cache.get(currChannel);
    channel.messages.fetch({ limit: 50 }).then(messages => {
    //Iterate through the messages here with the variable "messages".
    list = []
    messages.forEach(message => list.push(message.author.tag + ': ' + message.content));
    list.reverse()
    list.forEach(item => console.log(colors.green(item)))
  })
  } 
  else if (command == "clear") {
    console.clear()
  } else if (command == "navigate") {
    var guilds = client.guilds.cache;
    guilds.forEach( guild => { if (guild.name == (args.join(' '))) { currGuild = guild.id; console.log('Current server: ' + guild.name) } })
  } else if (command == "select") {
    client.channels.cache.forEach(channel => { 
    if (channel.guild.id == currGuild) { 
      if (channel.permissionsFor(client.user.id).has(['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'])) { 
        if (channel.name == (args.join(' '))) {currChannel = channel.id; console.log('Current channel: ' + channel.name)}
      }
    }
    })
  } else {
    console.log(colors.red.underline('sussy amogus imposter baka that is not a command 📮😳'))
  }
  chat();
}

function chat(){
  consol.question('', function(msg) {
    if (msg.startsWith('!')) { commands(msg) }
    else {
      sendMessage(msg, currChannel)
      chat();
    }
  })

};
chat();
// Login to Discord with your client's token
client.login(token);