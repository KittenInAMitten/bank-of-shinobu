require('./bot.js');
const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
//.replace(/[<@!>]/g, '') to replace <@!>
/* global Set */

module.exports = {
  
  //test
  
  test: async (message, args, bot) => {
    message.channel.send("Command does nothing.")
  }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}