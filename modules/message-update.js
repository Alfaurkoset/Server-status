const { MessageEmbed } = require('discord.js');


module.exports = async (config, client, response) => {
    var embed = new MessageEmbed()
    switch (response) {
        case null:
            embed.setColor('#fa4c20')
                .setTitle('SERVER STATUS')
                .addFields(
                    { value: 'Offline', inline: true, name: "Status:" },
                    { value: '0', inline: true, name: "Players:" },
                    { name: "Restarts", inline: false, value: "Night restart **01:00**" }
                )
                .setTimestamp()
            break;
    
        default:
            embed.setColor('#45c468')
                .setTitle('SERVER STATUS')
                .addFields(
                    { value: 'Online', inline: true, name: "Status:" },
                    { value: `${response.players.online}/${response.players.max}`, inline: true, name: "Players:" },
                    { name: "Restarts", inline: false, value: "Night restart **01:00**" }
                )
                .setTimestamp()
            break;
    }

    const message =  client.channels.cache.get(config.Message.Channel.ID).messages.fetch(config.Message.ID)
    message.then(async (m) => {
        m.edit({embeds: [embed]})
    })
    // message.then(async (m) => {
    //     m.edit(embed)
    // })
}
