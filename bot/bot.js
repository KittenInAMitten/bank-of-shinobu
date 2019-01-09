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
const moment = require('moment');
const fs = require('fs');
const commands =  require('./commands.js');
const userData = require('./data/userData.json');
const serverData = require('./data/serverData.json');
const bot = new Discord.Client({disableEveryone: true});
const prefix = "k10 ";

//Bot set up for when it goes active
bot.on('ready', () => {
  console.log(`Bot: ${bot.user.username} has successfully activated!`);
  bot.user.setActivity('you sleep | k10 help', { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
});

bot.on('guildCreate', guild =>{
  serverData[guild.id] = {
    "serverID": guild.id,
    "serverName": guild.name,
    "serverOwnerID": guild.ownerID,
    "currentBucks": 0
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
      "coins": 0
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
      if(message.author.id !== "163367723152310272"){
        message.reply("you ain't my daddy!");
        break;
      }
      let test = commands.test(message, args, bot);
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