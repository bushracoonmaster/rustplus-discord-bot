const { Client, GatewayIntentBits } = require('discord.js');
const RustPlus = require('rustplus');
require('dotenv').config();

// Discord bot setup
const client = new Client({
 intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Rust+ connection setup
const rust = new RustPlus(
 process.env.RUST_SERVER_IP, 
 process.env.RUST_SERVER_PORT, 
 process.env.STEAM_ID, 
 process.env.PLAYER_TOKEN
);

// Connect to Rust+
rust.connect();
rust.on('connected', () => {
 console.log('Connected to Rust+ Server');
});

// Discord bot login
client.once('ready', () => {
 console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
 if (message.content === '!status') {
 rust.getTime((time) => {
 message.reply(`Current in-game time: ${time.dayLength} minutes per day.`);
 });
 }
});

client.login(process.env.DISCORD_TOKEN);
