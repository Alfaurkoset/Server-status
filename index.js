// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const config = require('./config.json');
const deploy = require('./modules/deploy-commands')(client, Collection)
const fs = require('fs');
const { exitCode, exit } = require('process');
let createMessage = true

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => {event.execute(...args);});
    }
}


// Login to Discord with your client's token
client.login(config.Bot.TOKEN)
