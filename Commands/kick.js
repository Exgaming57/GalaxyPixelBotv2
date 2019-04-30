const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(args[0] == "help"){
    message.reply("Usage: {prefix}kick <user> <reason>");
  }
  if(!kUser) return message.channel.send("Can't find user!");
  let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have permission to do that!");
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That user can't be kicked!");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("~Kick~")
  //For the offical bot I will make this Green
  .setColor("#5315f1")
  .addField("Kicked user", `${kUser} with ID: ${kUser.id}`)
  .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Kicked in", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason);


  let kickchannel = message.guild.channels.find(`name`, "logs");
  if(!kickchannel) return message.channel.send("Couldn't find reporst channel!");


  message.guild.member(kUser).kick(kReason);
  message.delete().catch(O_o=>{});
  kickchannel.send(kickEmbed);

  return;
  }

module.exports.help = {
  name: "kick"
}
