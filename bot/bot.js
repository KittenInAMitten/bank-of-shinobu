//For the app to be pingable!
/* global Set */
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  //response.sendFile('/app/views/index.html');
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


//Variables being set
const Discord = require('discord.js');
const moment = require('moment-timezone'); //moment().tz("America/Edmonton").format("dddd, MMMM Do YYYY, h:mm:ss a zz");
const fs = require('fs');
const commands =  require('./commands.js');
const userData = require('./data/userData.json');
const serverData = require('./data/serverData.json');
const bot = new Discord.Client({disableEveryone: true});
const prefix = "donut ";

//Bot set up for when it goes active
bot.on('ready', () => {
  console.log(`Bot: ${bot.user.username} has successfully activated!`);
  bot.user.setActivity('you...', { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
});

bot.on('guildCreate', guild =>{
  serverData[guild.id] = {
    "serverID": guild.id,
    "serverName": guild.name,
    "bankChannel" : "",
    "serverOwnerID": guild.ownerID,
    "currentBucks": 0,
    "admins" : ["163367723152310272"]
  }
	fs.writeFile('/app/bot/data/serverData.json', JSON.stringify(serverData, null, 2), function (err) {
		if (err) return console.log(err);
	});
})

bot.on('guildUpdate', (oldGuild, newGuild) =>{
  if(serverData[oldGuild.id].serverName !== newGuild.name){
    serverData[oldGuild.id].serverName = newGuild.name;
  }
  if(serverData[oldGuild.id].serverOwnerID !== newGuild.ownerID){
    serverData[oldGuild.id].serverOwnerID = newGuild.ownerID;
  }
		fs.writeFile('/app/bot/data/serverData.json', JSON.stringify(serverData, null, 2), function (err) {
			if (err) return console.log(err);
		});
})

//When a message appears in guilds
bot.on('message', async message => {
  //Check if message author is bot
  if(message.author.bot) return;
  
  
  //splits messages
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  //Commands that require no prefix
  
  
  const msg = message.content.toLowerCase().trim().split(/ +/g);
  const entireMsg = message.content.toLowerCase();
  
  
  //Commands that require prefix
  if(!message.content.toLowerCase().startsWith(prefix)) return;
  
  //stopper
  /*
  if(message.author.id !== "163367723152310272"){
    message.reply("Bot Is Temporarily Unavailable Sorry!");
    return;
  }*/
  
  if(!userData.hasOwnProperty(message.author.id)){
    userData[message.author.id] = {
      "username": bot.users.get(message.author.id).username,
      "id": message.author.id,
      "bucks": 0,
      "coins": 0,
      "deposit": 0,
      "latestDeposit": "None"
    }
		fs.writeFile('/app/bot/data/userData.json', JSON.stringify(userData, null, 2), function (err) {
			if (err) return console.log(err);
		});
  }
  
  //Check to see if username is correct
  if(!userData[message.author.id].username !== bot.users.get(message.author.id).username){
    userData[message.author.id].username = bot.users.get(message.author.id).username;
    fs.writeFile('/app/bot/data/userData.json', JSON.stringify(userData, null, 2), function (err) {
			if (err) return console.log(err);
		});
  }
  
  
  switch(command){
      //TESTING COMMAND
    case "test":
      if(!serverData[message.guild.id].admins.includes(message.author.id)){
        message.reply("you ain't my daddy!");
        break;
      }
      let test = commands.test(message, args, bot);
      break;
      //set bank channel
    case "setchannel":
      if(!serverData[message.guild.id].admins.includes(message.author.id)){
        message.reply("you ain't my daddy!");
        break;
      }
      let channel = commands.channel(message, args, bot);
      break;
      //add admin
    case "addadmin":
      if(message.author.id !== "163367723152310272" && message.author.id !== "219692709147836426"){
        message.reply("you've been given the big gay.");
        break;
      }
      let addAdmin = commands.addAdmin(message, args, bot);
      break;
      //remove admin
    case "removeadmin":
      if(message.author.id !== "163367723152310272" && message.author.id !== "219692709147836426"){
        message.reply("you've been given the big gay.");
        break;
      }
      let removeAdmin = commands.removeAdmin(message, args, bot);
      break;
      //give bucks
    case "givebucks":
      if(!serverData[message.guild.id].admins.includes(message.author.id)){
        message.reply("no.");
        break;
      }
      let giveBucks = commands.giveBucks(message, args, bot);
      break;
      //take bucks
    case "takebucks":
      if(!serverData[message.guild.id].admins.includes(message.author.id)){
        message.reply("no.");
        break;
      }
      let takeBucks = commands.takeBucks(message, args, bot);
      break;
      //check bucks
    case "check":
      let check = commands.check(message, args, bot);
      break;
      //convert coins to bucks
    case "convert":
      let convert = commands.convert(message, args, bot);
      break;
      //give bucks
    case "givecoins":
      if(!serverData[message.guild.id].admins.includes(message.author.id)){
        message.reply("no.");
        break;
      }
      let giveCoins = commands.giveCoins(message, args, bot);
      break;
      //take bucks
    case "takecoins":
      if(!serverData[message.guild.id].admins.includes(message.author.id)){
        message.reply("no.");
        break;
      }
      let takeCoins = commands.takeCoins(message, args, bot);
      break;
    case "transfer":
      let transfer = commands.transfer(message, args, bot);
      break;
    case "changelog":
      let changelog = commands.changelog(message, args, bot);
      break;
    default: 
      const youFailed = await message.reply("that isn't a command!");
      youFailed.delete(5000);
      return;       
  }
  
  
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

bot.login(process.env.TOKEN);