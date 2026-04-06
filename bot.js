// Importer Bolt
const { App } = require('@slack/bolt');

// Initialiser l'app avec ton token et ton signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,         
  signingSecret: process.env.SLACK_SIGNING_SECRET 
});

/**
 * /hello
 * Mentionne tous les membres du channel et les salue.
 */
app.command('/hello', async ({ command, ack, client, say }) => {
  await ack();

  const channelId = command.channel_id;

  const result = await client.conversations.members({
    channel: channelId
  });

  const members = result.members;
  const mentions = members.map(id => `<@${id}>`).join(" ");

  await say(`Hello à tous 👋 ${mentions}`);
});


/**
 * /ping
 * Commande très utile pour tester si le bot répond bien.
 */
app.command('/ping', async ({ ack, respond }) => {
  await ack();
  await respond("🏓 Pong ! Le bot fonctionne correctement.");
});


/**
 * /help
 * Affiche toutes les commandes disponibles.
 */
app.command('/help', async ({ ack, respond }) => {
  await ack();

  await respond(`
📌 *Available Commands*
• /hello → greet everyone in the channel
• /ping → test if the bot is alive
• /about → info about the bot
• /echo [message] → repeat your message
• /remindme [seconds] [message] → reminder after X seconds
`);
});


/**
 * /about
 * Donne des infos sur ton bot.
 */
app.command('/about', async ({ ack, respond }) => {
  await ack();

  await respond(`
🤖 *SYLVESTRE IA BOT*
This is a Slack bot built with Node.js + Slack Bolt.
Features:
✅ Slash commands
✅ Message logging
✅ Channel interactions
`);
});


/**
 * /echo
 * Répète le message donné par l'utilisateur.
 * Exemple : /echo Bonjour tout le monde
 */
app.command('/echo', async ({ command, ack, respond }) => {
  await ack();

  const text = command.text;

  if (!text || text.trim() === "") {
    await respond("⚠️ Usage: /echo [message]");
    return;
  }

  await respond(`🗣️ You said: *${text}*`);
});


/**
 * /remindme
 * Rappel simple après X secondes.
 * Exemple : /remindme 10 boire de l'eau
 */
app.command('/remindme', async ({ command, ack, say }) => {
  await ack();

  const args = command.text.split(" ");

  const seconds = parseInt(args[0]);
  const message = args.slice(1).join(" ");

  if (isNaN(seconds) || seconds <= 0 || message.trim() === "") {
    await say("⚠️ Usage: /remindme [seconds] [message]");
    return;
  }

  await say(`⏳ Okay! I will remind you in ${seconds} seconds...`);

  setTimeout(async () => {
    await say(`⏰ Reminder for <@${command.user_id}> : *${message}*`);
  }, seconds * 1000);
});


/**
 * Event Listener
 * Log tous les messages envoyés dans le channel.
 */
app.event('message', async ({ event }) => {
  console.log(`Message reçu de ${event.user}: ${event.text}`);
});


// Lancer le bot
(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);
  console.log(`⚡️ Bot Slack démarré sur le port ${port}`);
})();