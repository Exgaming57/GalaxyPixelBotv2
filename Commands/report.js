const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(args[0] == "help"){
    message.reply("Usage: {prefix}report <user> <reason>");
  }
  if(!rUser) return message.channel.send("Couldn't find user.");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  //For the offical bot I will make this Red
  .setColor("#5315f1")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  .addField("Reported Channel", message.channel)
  .addField("Reported Time", message.createdAt)
  .addField("Reason", reason);

  let reportschannel = message.guild.channels.find(`name`, "logs");
  if(!reportschannel) return message.channel.send("Couldn't find reporst channel!");

  //Deletes the report message
  message.delete();
  reportschannel.send(reportEmbed);
}

module.exports.help = {
  name: "report"
}
