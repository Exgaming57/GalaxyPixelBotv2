const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(args[0] == "help"){
    message.reply("Usage: {prefix}ban <user> <reason>");
  }
   if(!bUser) return message.channel.send("Can't find user!");
   let bReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have permission to do that!");
     if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That user can't be Banned!");

   let BanEmbed = new Discord.RichEmbed()
   .setDescription("~Ban~")
   //For the offical bot I will make this Green
   .setColor("#5315f1")
   .addField("Banned user", `${bUser} with ID: ${bUser.id}`)
   .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
   .addField("Banned in", message.channel)
   .addField("Time", message.createdAt)
   .addField("Reason", bReason);


   let banchannel = message.guild.channels.find(`name`, "logs");
   if(!banchannel) return message.channel.send("Couldn't find reporst channel!");


   message.guild.member(bUser).ban(bReason);
   banchannel.send(BanEmbed);

   message.delete();
 }

module.exports.help = {
  name: "ban"
}
