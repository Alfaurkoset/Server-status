
const WebSocketClient = require("websocket").client
const onConnection = require("../modules/ws-onConnect")
const { connection } = require("websocket");

var wsClient = new WebSocketClient();

wsClient.on('connectFailed', (con) => onConnectionFailure(con))

wsClient.on('connect', (con) => onConnection(con));




const config = require("../config.json")
const serverStatus = require('../modules/server-check')
const messageUpdate = require('../modules/message-update');
const onConnectionFailure = require("../modules/ws-onConnectFailed");
module.exports = [{
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        await require("../modules/message-creation")(config, client)
        wsClient.connect('ws://localhost:8081/', 'echo-protocol');
        }
    }, wsClient];
