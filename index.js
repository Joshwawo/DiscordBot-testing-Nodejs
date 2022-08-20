const { token, clientId, guildId } = require("./config.json");
const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  Routes,
} = require("discord.js");
const { REST } = require("@discordjs/rest");
const dotenv = require("dotenv");

dotenv.config();

//Creando una nueva instancia

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Cuando el cliente este listo, corre este codigo solo una vez
const comandos = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!"),
  new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!"),
].map((comandos) => comandos.toJSON());

const respuesta = new REST({ version: "10" }).setToken(token);

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interacion) => {
  if (!interacion.isChatInputCommand()) return;

  const { commandName } = interacion;

  if (commandName === "ping") {
    await interacion.reply("Pong!");
  } else if (commandName === "server") {
    await interacion.reply(`Server info: ${interacion.guild.name}\nTotal Members: ${interacion.guild.memberCount} `);

  } else if (commandName === "user") {
    await interacion.reply(`User info Tag:${interacion.user.tag}\n Tú id:${interacion.user.id} `);
  }
});

respuesta
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: comandos })
  .then(() => console.log("Comandos de aplicación registrados con éxito."))
  .catch(console.error);

client.login(token);
