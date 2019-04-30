const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You don't have the permission to run this command!");
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(args[0] == "help"){
    message.reply("Usage: {prefix}removerole <user> <role>");
  }
  if(!rMember) return message.reply("Couldn't find that user!");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role!");

  if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role!");
  await(rMember.removeRole(gRole.id));


  try{
    await rMember.send(`Sorry, you have lost the ${gRole.name} role!`)
  }catch(e){
    message.channel.send(`Sorry to <@${rMember.id}>, they have lost the ${gRole.name} role. We tried to notify them in the DMs but their DMs are locked.`)
  }

  message.delete();



}


module.exports.help = {
  name: "removerole"
}
