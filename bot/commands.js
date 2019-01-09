require('./bot.js');
const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
//.replace(/[<@!>]/g, '') to replace <@!>
/* global Set */

module.exports = {
  
  //test
  
  test: async (message, args, bot) => {
    //if(!(bot.users.get(args[0].replace(/[<@!>]/g, '')))) return console.log(`not a user!`);
    //if(bot.users.get(args[0].replace(/[<@!>]/g, ''))) return console.log(`a user!`);
    
    /**
    const cd = require('./data/cooldowns.json');
    const server = message.guild.id;
    if(!cd.hasOwnProperty(server)){
      cd[server] = {};
    }
    if(moment().diff(moment(cd[server][message.author.id]), "seconds") < 30){
      message.channel.send(`30 seconds haven't passed yet \n${moment()}\n${moment(cd[server][message.author.id])}`);
      return;
    }
    message.channel.send(`30 seconds have passed already\n${moment()}\n${moment(cd[server][message.author.id])}`);
    cd[server][message.author.id] = moment();
    fs.writeFile('/app/bot/data/cooldowns.json', JSON.stringify(cd), function (err) {
		if (err) return console.log(err);
		});
    **/
    
    
    
  }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}