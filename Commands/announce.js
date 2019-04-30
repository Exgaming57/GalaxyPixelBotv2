const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(message.member.hasPermission("ADMINISTRATOR")) {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have permission to use that command!")
  message.delete()
  const text = args.join(" ")
  if (text.length < 1) return message.reply("Nothing to announce. Please type what you want to announce!");
  const colour = args.slice(2).join(" ");

    let announceEmbed = new Discord.RichEmbed()
    .setColor("#ee00ff")
    .setDescription(text);


    let announceChannel = message.guild.channels.find(`name`, "announcements");
    if(!announceChannel) return message.reply("Couldn't find an `Announcements` channel!");
    announceChannel.send(`@everyone`)
    announceChannel.send(announceEmbed);
  }

}

module.exports.help = {
  name: "announce"
}
