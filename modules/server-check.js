const { MinecraftServerListPing, MinecraftQuery } = require("minecraft-status");

module.exports = async (server, callback) => {
    MinecraftServerListPing.ping(server.protocol, server.Host, server.Port, server.timeout)
    .then(response => callback(error = null, response))
    .catch(error => callback(error, response = null))
    
}
