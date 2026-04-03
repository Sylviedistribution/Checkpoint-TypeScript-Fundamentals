// Importer Bolt
const { App } = require('@slack/bolt');

// Initialiser l'app avec ton token et ton signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,         // Ton OAuth token
  signingSecret: process.env.SLACK_SIGNING_SECRET // Ton signing secret
});

// Écouter la commande slash /hello
// app.command('/hello', async ({ command, ack, say }) => {
//   await ack(); // Accuser réception de la commande
//   await say(`Hello <@${command.user_id}> !`);
// });

// app.command('/hello', async ({ ack, say }) => {
//   await ack();
//   await say(`Goodbye <!channel> 👋`);
// });

app.command('/hello', async ({ command, ack, client, say }) => {
  await ack();

  const channelId = command.channel_id;

  // récupérer les membres du channel
  const result = await client.conversations.members({
    channel: channelId
  });

  const members = result.members;

  // construire un message avec mention de chaque membre
  const mentions = members.map(id => `<@${id}>`).join(" ");

  await say(`Hello à tous 👋 ${mentions}`);
});

// Écouter tous les messages dans les channels abonnés
app.event('message', async ({ event }) => {
  console.log(`Message reçu de ${event.user}: ${event.text}`);
});

// Lancer le bot
(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);
  console.log(`⚡️ Bot Slack démarré sur le port ${port}`);
})();