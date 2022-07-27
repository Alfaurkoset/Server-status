const config = require("../config.json")
const serverStatus = require('../modules/server-check')
const messageUpdate = require('../modules/message-update')
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        await require("../modules/message-creation")(config, client)
        setInterval(async () => {
                await serverStatus(config.Server, (err, res) => {
                    // if(err) return console.error(err);
                    // console.log(res)
                    messageUpdate(config, client, res)
            })
        }, 15000)
        },
    };
