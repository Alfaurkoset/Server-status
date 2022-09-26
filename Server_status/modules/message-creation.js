const { MessageEmbed } = require('discord.js');
const fs = require('fs')
require("../config.json")

const embed = new MessageEmbed()
    .setColor('#858585')
    .setTitle('SERVER STATUS')
    .addFields(
        { value: 'Pending…', inline: true, name:"Status:"},
        { value: 'Test\nTest\nTEst', inline: true, name: "Players:"},
        {name: "Restarts", inline: false, value: "Night restart **01:00**"}
    )
    .setTimestamp()



const configFilepath = "config.json"
    
module.exports = async (config, client) => {
    if(!client) {console.log("No client defined"); return;}
    if(!config) {console.error("Config error: no config file defined"); return;}
    if (!config.Message.Channel || config.Message.Channel.ID == "" && config.Message.Channel.Name == "") {
            console.error("Config error: no message channel defined");
            return;
        }
        if (config.Message.ID != "") {
            return
    }
    const channel = client.channels.fetch(config.Message.Channel.ID)
    await channel.then(c => {
        c.send({embeds: [embed]}).then( async (message) => {
            console.log(message.id);
            const parseConfig = JSON.parse(fs.readFileSync(configFilepath).toString())
            parseConfig.Message.ID = message.id
            fs.writeFileSync(configFilepath,JSON.stringify(parseConfig))
        })
    })

}
