require('./bot.js');
const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment-timezone');
//.replace(/[<@!>]/g, '') to replace <@!>
/* global Set */

module.exports = {
  
  //test
  
  test: async (message, args, bot) => {
    //message.channel.send("You pass the test.")
    //console.log(moment().tz("America/Edmonton").format("dddd, MMMM Do YYYY, h:mm:ss a zz"))
    message.channel.send(845%100);
  },
  
  channel: async (message, args, bot) => {
    const serverData = require('./data/serverData.json');
    if(args.length > 1) {
      message.channel.send("Invalid command usage");
      return;
    }
    if(!(bot.channels.get(args[0].replace(/[<#>]/g, '')))){
      message.channel.send("Not a valid channel!");
      return;
    }
    serverData[message.guild.id].channel = args[0].replace(/[<#>]/g, '');
    message.channel.send(`Successfully changed Bank Channel to <#${args[0].replace(/[<#>]/g, '')}>`);
		fs.writeFile('/app/bot/data/serverData.json', JSON.stringify(serverData, null, 2), function (err) {
			if (err) return console.log(err);
		});
  },
  
  addAdmin: async (message, args, bot) => {
    const serverData = require('./data/serverData.json');
    const botChannel = serverData[message.guild.id].channel;
    if(args.length > 1) {
      message.channel.send("Invalid command usage");
      return;
    }
    if(!(bot.users.get(args[0].replace(/[<@!>]/g, '')))){
      message.channel.send("That isn't a person, idiot.");
      return;
    }
    if(serverData[message.guild.id].admins.includes(args[0].replace(/[<@!>]/g, ''))){
      message.channel.send("They're already an admin, idiot.");
      return;
    }
    serverData[message.guild.id].admins.push(args[0].replace(/[<@!>]/g, ''));
    
    var embed = new Discord.RichEmbed()
      .setColor(1438719)
      .setFooter(`Date of Action:`)
      .setTimestamp()
      .setAuthor("Shinobu", `${bot.user.avatarURL}`)
      .addField("ACTION DETECTED!", `<@${message.author.id}> has added <@${args[0].replace(/[<@>]/g, '')}> to Admins.`);
    bot.channels.get(serverData[message.guild.id].channel).send(embed);
    
		fs.writeFile('/app/bot/data/serverData.json', JSON.stringify(serverData, null, 2), function (err) {
			if (err) return console.log(err);
		});
    
  },
  
  removeAdmin: async (message, args, bot) => {
    const serverData = require('./data/serverData.json');
    if(args.length > 1) {
      message.channel.send("Invalid command usage");
      return;
    }
    if(!(serverData[message.guild.id].admins.includes(args[0].replace(/[<@!>]/g, '')))){
      message.channel.send("That isn't an admin, idiot.");
      return;
    }
    if(args[0].replace(/[<@!>]/g, '') === "163367723152310272" || args[0].replace(/[<@!>]/g, '') === "219692709147836426"){
      message.channel.send("No.");
      return;
    }
    
    serverData[message.guild.id].admins.splice(serverData[message.guild.id].admins.indexOf(args[0].replace(/[<@!>]/g, '')), 1);
    
    var embed = new Discord.RichEmbed()
      .setColor(1438719)
      .setFooter(`Date of Action:`)
      .setTimestamp()
      .setAuthor("Shinobu", `${bot.user.avatarURL}`)
      .addField("ACTION DETECTED!", `<@${message.author.id}> has removed <@${args[0].replace(/[<@>]/g, '')}> from Admins.`);
    bot.channels.get(serverData[message.guild.id].channel).send(embed);
    
		fs.writeFile('/app/bot/data/serverData.json', JSON.stringify(serverData, null, 2), function (err) {
			if (err) return console.log(err);
		});
    
  },
  
  giveBucks: async (message, args, bot) => {
    const serverData = require('./data/serverData.json');
    const userData = require('./data/userData.json');
    if(args.length !== 2) {
      message.channel.send("`donut givebucks <user> <number>`, idiot.");
      return;
    }
    if(!(bot.users.get(args[0].replace(/[<@!>]/g, '')))){
      message.channel.send("`donut givebucks <user> <number>`, idiot.");
      return;
    }
    if(!parseInt(args[1],10)){
      message.channel.send("`donut givebucks <user> <number>`, idiot.");
      return;
    }
    const amount = args[1];
    const user = args[0].replace(/[<@!>]/g, '');
    
    if(!userData.hasOwnProperty(user)){
      userData[user] = {
        "username": bot.users.get(user).username,
        "id": user,
        "bucks": 0,
        "coins": 0,
        "deposit": 0,
        "latestDeposit": "None"
      }
    }
    
    userData[user].bucks = userData[user].bucks + parseInt(amount,10);
    if(parseInt(amount,10) < 1){
      message.channel.send("No, you can't do that, idiot.");
      return;
    }
    
    var embed = new Discord.RichEmbed()
      .setColor(1438719)
      .setFooter(`Date of Action:`)
      .setTimestamp()
      .setAuthor("Shinobu", `${bot.user.avatarURL}`)
      .setImage("https://cdn.discordapp.com/attachments/490664566427090954/532446633821208576/154691771458235348.png")
      .addField("ACTION DETECTED!", `The Bank has given ${amount} Shinobu Bucks to <@${user}>.\n<@${message.author.id}> initiated the command.`);
    bot.channels.get(serverData[message.guild.id].channel).send(embed);
    
		fs.writeFile('/app/bot/data/userData.json', JSON.stringify(userData, null, 2), function (err) {
			if (err) return console.log(err);
		});
    
  },
  
  takeBucks: async (message, args, bot) => {
    const serverData = require('./data/serverData.json');
    const userData = require('./data/userData.json');
    if(args.length !== 2) {
      message.channel.send("`donut takebucks <user> <number>`, idiot.");
      return;
    }
    if(!(bot.users.get(args[0].replace(/[<@!>]/g, '')))){
      message.channel.send("`donut takebucks <user> <number>`, idiot.");
      return;
    }
    if(!parseInt(args[1],10)){
      message.channel.send("`donut takebucks <user> <number>`, idiot.");
      return;
    }
    const amount = args[1];
    const user = args[0].replace(/[<@!>]/g, '');
    
    if(!userData.hasOwnProperty(user)){
      userData[user] = {
        "username": bot.users.get(user).username,
        "id": user,
        "bucks": 0,
        "coins": 0,
        "deposit": 0,
        "latestDeposit": "None"
      }
    }
    
    if(parseInt(amount,10) > userData[user].bucks) {
      message.reply("They don't even have that much, idiot.");
      return;
    }
    if(parseInt(amount,10) < 1){
      message.channel.send("No, you can't do that, idiot.");
      return;
    }
    userData[user].bucks = userData[user].bucks - parseInt(amount,10);
    
    var embed = new Discord.RichEmbed()
      .setColor(1438719)
      .setFooter(`Date of Action:`)
      .setTimestamp()
      .setAuthor("Shinobu", `${bot.user.avatarURL}`)
      .setImage("https://cdn.discordapp.com/attachments/490664566427090954/532446633821208576/154691771458235348.png")
      .addField("ACTION DETECTED!", `The Bank has taken ${amount} Shinobu Bucks from <@${user}>.\n<@${message.author.id}> initiated the command.`);
    bot.channels.get(serverData[message.guild.id].channel).send(embed);
    
		fs.writeFile('/app/bot/data/userData.json', JSON.stringify(userData, null, 2), function (err) {
			if (err) return console.log(err);
		});
    
  },
  
  check: async (message, args, bot) => {
    const serverData = require('./data/serverData.json');
    const userData = require('./data/userData.json');
    var option = false;
    var optionUser = message.author.id;
    if(args.length > 0) {
      option = true;
      optionUser = args[0].replace(/[<@!>]/g, '');
    }
    if(option && !(bot.users.get(optionUser))){
      option = false;
      optionUser = message.author.id;
    }
    
    if(!userData.hasOwnProperty(optionUser)){
      message.channel.send(`I have no data on this person, maybe get them to run a donut command!`);
      return;
    }
    var embed = new Discord.RichEmbed()
      .setColor(1438719)
      .setThumbnail(`${bot.users.get(optionUser).avatarURL}`)
      .setAuthor("PROFILE CHECK", `${bot.users.get(optionUser).avatarURL}`)
      .setTimestamp()
      .setTitle(`${bot.users.get(optionUser).username}'s Profile`)
      .addField("SHINOBU BUCKS", `${userData[optionUser].bucks}`,true)
      .addField("HACHIKUJI COINS", `${userData[optionUser].coins}`,true)
      .addField("LATEST DEPOSIT", `${userData[optionUser].latestDeposit}`)
      .addField("NOTE", "Bot is still under development, sorry if there's any bugs or missing info! Tell Kitten if there are problems!")
    message.channel.send(embed)
    .catch(error => message.reply(`${error}\n I'm missing the \`EMBED LINKS\` permission in this channel!`));
  },
  
  convert: async (message, args, bot) => {
    const serverData = require('./data/serverData.json');
    const userData = require('./data/userData.json');
    if(args.length > 0) {
      message.channel.send("`donut convert`, idiot.");
      return;
    }
    const amount = args[0];
    const coinsAmount = parseInt(amount,10) * 100;
    const user = message.author.id;
    if(userData[user].coins < 100) {
      message.reply("you don't even have enough for a buck, idiot.");
      return;
    }
    var remainder = userData[user].coins%100;
    var conversion = userData[user].coins - remainder;
    var converted = conversion/100;
    userData[user].coins = userData[user].coins - conversion;
    userData[user].bucks = userData[user].bucks + converted;
    
    var embed = new Discord.RichEmbed()
      .setColor(1438719)
      .setFooter(`Date of Action:`)
      .setTimestamp()
      .setAuthor("Shinobu", `${bot.user.avatarURL}`)
      .setImage("https://cdn.discordapp.com/attachments/490664566427090954/532446629001691166/ShinobuOneDollarandcoin.png")
      .addField("ACTION DETECTED!", `<@${message.author.id}> has converted ${conversion} Hachikuji Coins into ${converted} Shinobu Bucks.`);
    bot.channels.get(serverData[message.guild.id].channel).send(embed);
    
		fs.writeFile('/app/bot/data/userData.json', JSON.stringify(userData, null, 2), function (err) {
			if (err) return console.log(err);
		});
    
  },
  
  giveCoins: async (message, args, bot) => {
    const serverData = require('./data/serverData.json');
    const userData = require('./data/userData.json');
    if(args.length !== 2) {
      message.channel.send("`donut givecoins <user> <number>`, idiot.");
      return;
    }
    if(!(bot.users.get(args[0].replace(/[<@!>]/g, '')))){
      message.channel.send("`donut givecoins <user> <number>`, idiot.");
      return;
    }
    if(!parseInt(args[1],10)){
      message.channel.send("`donut givecoins <user> <number>`, idiot.");
      return;
    }
    const amount = args[1];
    const user = args[0].replace(/[<@!>]/g, '');
    
    if(parseInt(amount,10) < 1){
      message.channel.send("No, you can't do that, idiot.");
      return;
    }
    
    if(!userData.hasOwnProperty(user)){
      userData[user] = {
        "username": bot.users.get(user).username,
        "id": user,
        "bucks": 0,
        "coins": 0,
        "deposit": 0,
        "latestDeposit": "None"
      }
    }
    
    userData[user].coins = userData[user].coins + parseInt(amount,10);
    
    var embed = new Discord.RichEmbed()
      .setColor(1438719)
      .setFooter(`Date of Action:`)
      .setTimestamp()
      .setAuthor("Shinobu", `${bot.user.avatarURL}`)
      .setImage("https://cdn.discordapp.com/attachments/490664566427090954/532446635146477578/invert.png")
      .addField("ACTION DETECTED!", `The Bank has given ${amount} Hachikuji Coins to <@${user}>.\n<@${message.author.id}> initiated the command.`);
    bot.channels.get(serverData[message.guild.id].channel).send(embed);
    
		fs.writeFile('/app/bot/data/userData.json', JSON.stringify(userData, null, 2), function (err) {
			if (err) return console.log(err);
		});
    
  },
  
  takeCoins: async (message, args, bot) => {
    const serverData = require('./data/serverData.json');
    const userData = require('./data/userData.json');
    if(args.length !== 2) {
      message.channel.send("`donut takecoins <user> <number>`, idiot.");
      return;
    }
    if(!(bot.users.get(args[0].replace(/[<@!>]/g, '')))){
      message.channel.send("`donut takecoins <user> <number>`, idiot.");
      return;
    }
    if(!parseInt(args[1],10)){
      message.channel.send("`donut takecoins <user> <number>`, idiot.");
      return;
    }
    const amount = args[1];
    const user = args[0].replace(/[<@!>]/g, '');
    
    if(!userData.hasOwnProperty(user)){
      userData[user] = {
        "username": bot.users.get(user).username,
        "id": user,
        "bucks": 0,
        "coins": 0,
        "deposit": 0,
        "latestDeposit": "None"
      }
    }
    
    if(parseInt(amount,10) > userData[user].coins) {
      message.reply("They don't even have that much, idiot.");
      return;
    }
    if(parseInt(amount,10) < 1){
      message.channel.send("No, you can't do that, idiot.");
      return;
    }
    userData[user].coins = userData[user].coins - parseInt(amount,10);
    
    var embed = new Discord.RichEmbed()
      .setColor(1438719)
      .setFooter(`Date of Action:`)
      .setTimestamp()
      .setAuthor("Shinobu", `${bot.user.avatarURL}`)
      .setImage("https://cdn.discordapp.com/attachments/490664566427090954/532446635146477578/invert.png")
      .addField("ACTION DETECTED!", `The Bank has taken ${amount} Hachikuji Coins from <@${user}>.\n<@${message.author.id}> initiated the command.`);
    bot.channels.get(serverData[message.guild.id].channel).send(embed);
    
		fs.writeFile('/app/bot/data/userData.json', JSON.stringify(userData, null, 2), function (err) {
			if (err) return console.log(err);
		});
    
  },
  
  transfer: async (message, args, bot) => {
    const serverData = require('./data/serverData.json');
    const userData = require('./data/userData.json');
    if(args.length < 2) {
      message.channel.send("`donut transfer <user> <bucks amount>`, idiot.");
      return;
    }
    if(!(bot.users.get(args[0].replace(/[<@!>]/g, '')))){
      message.channel.send("`donut transfer <user> <bucks amount>`, idiot.");
      return;
    }
    if(!parseInt(args[1],10)){
      message.channel.send("`donut transfer <user> <bucks amount>`, idiot.");
      return;
    }
    
    const amount = parseInt(args[1],10);
    var coinsAmount = amount * 100;
    coinsAmount = coinsAmount / 2;
    const user = message.author.id;
    const otherUser = args[0].replace(/[<@!>]/g, '');
    
    if(amount > userData[user].bucks){
      message.channel.send("You don't even have enough bucks, idiot.");
      return;
    }
    if(amount < 1){
      message.channel.send("No, you can't transfer nothing, idiot.");
      return;
    }
    
    if(!userData.hasOwnProperty(otherUser)){
      userData[otherUser] = {
        "username": bot.users.get(otherUser).username,
        "id": otherUser,
        "bucks": 0,
        "coins": 0,
        "deposit": 0,
        "latestDeposit": "None"
      }
    }
    
    userData[user].bucks = userData[user].bucks - amount;
    userData[otherUser].coins = userData[otherUser].coins + coinsAmount;
    
    var embed = new Discord.RichEmbed()
      .setColor(1438719)
      .setFooter(`Date of Action:`)
      .setTimestamp()
      .setAuthor("Shinobu", `${bot.user.avatarURL}`)
      .setImage("https://cdn.discordapp.com/attachments/490664566427090954/532446629001691166/ShinobuOneDollarandcoin.png")
      .addField("ACTION DETECTED!", `<@${user}> has transferred ${amount} Shinobu Bucks to <@${otherUser}>, who has received ${coinsAmount} Hachikuji Coins.`);
    bot.channels.get(serverData[message.guild.id].channel).send(embed);
    
		fs.writeFile('/app/bot/data/userData.json', JSON.stringify(userData, null, 2), function (err) {
			if (err) return console.log(err);
		});
    
  
  },
  
  changelog: (message, args, bot) => {
    const log = require('./data/changelog.json');
    var embed = new Discord.RichEmbed()
    .setTitle(log.title)
    .setAuthor("Shinobu", `${bot.user.avatarURL}`)
    .setColor(1438719)
    .setDescription(log.description)
    .setFooter("If there is anything wrong with the bot, contact Kitten!")
    .setTimestamp()
    .addField("NEW COMMANDS",log.addcommands)
    .addField("UPDATED COMMANDS",log.updatecommands)
    .addField("BUG FIXES",log.bugs)
    .addField("PLANNED FEATURES",log.future);
    message.channel.send(embed)
    .catch(error => message.reply(`${error}\n I'm missing the \`EMBED LINKS\` permission in this channel!`));
  }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}