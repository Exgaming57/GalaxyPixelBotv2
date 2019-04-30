const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //This allows me to make an embed
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("Bot Information")
  .setColor("#5315f1")
  //This lets me have the bot Profile pictuer be shown in the bot Information
  .setThumbnail(bicon)
  //This is to add fields to the embed. Can have as many fields as I want but at the end I need to add a ;
  .addField("Bot Name", bot.user.username)
  .addField("Created on", bot.user.createdAt);

  message.delete();


  return message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo"
}
