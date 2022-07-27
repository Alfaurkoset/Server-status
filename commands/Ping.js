const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const client = interaction.client;
        await interaction.reply(`Websocket ping is ${client.ws.ping}ms`);
        
    },
};