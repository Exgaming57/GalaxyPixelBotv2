const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {


  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(args[0] == "help"){
    message.reply("Usage: {prefix}tempmute <user> <time>");
  }
  if(!tomute) return message.reply("Couldn't find user!");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "Muted");
  //Makes a "muted" role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      });
      //Sets the permissions of the newly created role
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    };
  };
  //Sets the time to be Muted
  let mutetime = args[1]
  if(!mutetime) return message.reply("You didn't designate a time frame!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));

  let muteEmbed = new Discord.RichEmbed()
  .setDescription("Mute Reports")
  //For the offical bot I will make this Red
  .setColor("#5315f1")
  .addField("Muted User", `${tomute} with ID: ${tomute.id}`)
  .addField("Muted By", `${message.author} with ID: ${message.author.id}`)
  .addField("Reported Channel", message.channel)
  .addField("Muted Time", `${ms(ms(mutetime))}`);

  let mutechannel = message.guild.channels.find(`name`, "logs");
  if(!mutechannel) return message.channel.send("Couldn't find reporst channel!");

  //Deletes the tempmute command
  message.delete();
  mutechannel.send(muteEmbed);


}



module.exports.help = {
  name: "tempmute"
}
