const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You don't have permission to use this command!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(args[0] == "help"){
    message.reply("Usage: {prefix}warn <user> <reason>");
  }
  if(!wUser) return message.reply("Couldn't find the user!");
  if(wUser.hasPermission("ADMINISTRATOR")) return message.reply("They can't be warned!")
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.jog(err);
  });

  let warnsEmbed = new Discord.RichEmbed()
  .setDescription("Warnings")
  .setAuthor(message.author.username)
  .setColor("#5315f1")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("warned In", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason);

  let warnchannel = message.guild.channels.find(`name`, "logs");
  if(!warnchannel) return message.reply("Couldn't find channel!");

  warnchannel.send(warnsEmbed);


  if(warns[wUser.id].warns == 3){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.reply("Role not found!");

    let mutetime = "24h";
    await(wUser.addRole(muterole.id));
    message.channel.send(`${wUser.tag} has been temporarily muted!`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> has been unmuted!`)
    }, ms(mutetime))
  }

  if(warns[wUser.id].warns == 6){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.reply("Role not found!");

    let mutetime = "3d";
    await(wUser.addRole(muterole.id));
    message.channel.send(`${wUser.tag} has been temporarily muted!`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> has been unmuted!`)
    }, ms(mutetime))
  }

    if(warns[wUser.id].warns == 9){
      let muterole = message.guild.roles.find(`name`, "Muted");
      if(!muterole) return message.reply("Role not found!");

      let mutetime = "7d";
      await(wUser.addRole(muterole.id));
      message.channel.send(`${wUser.tag} has been temporarily muted!`);

      setTimeout(function(){
        wUser.removeRole(muterole.id)
        message.reply(`<@${wUser.id}> has been unmuted!`)
      }, ms(mutetime))

      if(warns[wUser.id].warns == 12){
        message.guild.member(wUser).ban(reason);
    message.reply(`${wUser.id} has been banned!`)
        }
      }

      message.delete();
}




module.exports.help = {
  name: "warn"
}
