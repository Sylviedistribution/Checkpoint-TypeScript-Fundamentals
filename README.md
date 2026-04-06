# Slack Bot with Node.js + Slack Events API (Bolt)

This project is a simple Slack bot built with **Node.js** using **Slack Bolt** and the **Slack Events API**.
It listens to messages in Slack channels, logs them in the terminal, and responds to a custom slash command `/hello`.

---

## 📌 Project Goal

The objective of this checkpoint is to:

* Create a Slack App
* Configure OAuth permissions (scopes)
* Enable the Slack Events API
* Connect the bot to Slack using Bolt
* Respond to the `/hello` command
* Log all messages received in a channel
* Expose the local server using **ngrok**

---

## 🛠️ Technologies Used

* Node.js
* Slack Bolt (`@slack/bolt`)
* Slack API (Events API + Slash Commands)
* ngrok

---

# ✅ Step 1: Create the Slack App

1. Go to the Slack API dashboard:
   [https://api.slack.com/apps](https://api.slack.com/apps)

2. Click **Create New App**

3. Choose **From Scratch**

4. Give it a name (example: `SYLVESTRE IA`)

5. Select your Slack workspace

6. Click **Create App**

📌 *(Insert screenshot here)*

---

# ✅ Step 2: Configure OAuth Scopes

Go to:

**OAuth & Permissions → Scopes**

Add the following scopes:

### Bot Token Scopes (Required)

* `chat:write`
* `channels:history`

### Extra scopes added for advanced feature (mention all members)

* `conversations:read`
* `conversations.members`

📌 These extra scopes allow the bot to retrieve the list of members inside a channel and mention them.

---

# ✅ Step 3: Install the App to the Workspace

Still in **OAuth & Permissions**:

1. Click **Install to Workspace**
2. Authorize the permissions

After installation, Slack will generate a **Bot User OAuth Token** (starts with `xoxb-...`).

📌 Save this token because it is required in the `.env` file.


---

# ✅ Step 4: Enable Slack Events API

Go to:

**Event Subscriptions**

1. Turn **Enable Events** ON
2. You will need a public URL (ngrok will be used later)

Then, under **Subscribe to Bot Events**, add:

* `message.channels`

This allows the bot to receive events whenever someone sends a message inside a public channel.

---

# ✅ Step 5: Create the Slash Command `/hello`

Go to:

**Slash Commands → Create New Command**

Fill the fields:

### Command

```
/hello
```

### Request URL

This must point to your ngrok URL and Bolt endpoint:

```
https://xxxx-xx-xx-xx.ngrok-free.app/slack/events
```

### Short Description

```
Greet people
```

### Usage Hint

```
/hello
```

Save the command.

---

# ✅ Step 6: Reinstall Slack App

Every time you modify scopes or add a slash command, you must reinstall the app.

Go to:

**OAuth & Permissions → Reinstall to Workspace**

Then authorize again.

---

# ✅ Step 7: Setup Node.js Project

Make sure Node.js is installed:
[https://nodejs.org](https://nodejs.org)

Check version:

```bash
node -v
npm -v
```

Initialize Node project:

```bash
npm init -y
```

Install Slack Bolt:

```bash
npm install @slack/bolt
```

---

# ✅ Step 8: Create Environment Variables (.env)

Create a `.env` file:

```env
SLACK_BOT_TOKEN=xoxb-your-token-here
SLACK_SIGNING_SECRET=your-signing-secret-here
PORT=3000
```

📌 You can find:

### Bot Token

Slack Dashboard → **OAuth & Permissions** → **Bot User OAuth Token**

### Signing Secret

Slack Dashboard → **Basic Information** → **App Credentials**

⚠️ Never commit `.env` into GitHub.

Add `.env` to `.gitignore`:

```bash
echo .env >> .gitignore
```

---

# ✅ Step 9: Run the Bot

Start the bot:

```bash
node bot.js
```

Expected output:

```
⚡️ Slack bot is running on port 3000
```

---

# ✅ Step 10: Expose Localhost Using ngrok

Slack cannot connect directly to localhost.
Start ngrok:

```bash
ngrok http 3000
```

ngrok will give you a public URL like:

```
https://956f-41-83-161-139.ngrok-free.app
```


Then update Slack dashboard:

### Slash Commands Request URL

```
https://956f-41-83-161-139.ngrok-free.app/slack/events
```

### Event Subscriptions Request URL

```
https://956f-41-83-161-139.ngrok-free.app/slack/events
```

⚠️ ngrok URL changes every time you restart it (unless you use a paid static domain).


---

# ✅ Step 12: Testing the Bot in Slack

## Test 1: Slash Command

In any channel where the bot is present, type:

```
/hello
```

The bot should respond by greeting all members.

## Test 2: Message Logging

Send any message in the channel:

```
Hello bot
```

The bot should log it in the terminal:

```
Message received from UXXXXXXX: Hello bot
```

---

# ✅ Step 13: Invite Bot to a Channel

In Slack channel:

```
/invite @SYLVESTRE IA
```

Or manually:

* Open channel settings
* Click **Add people**
* Search the bot name
* Add it to the channel

---

# ⚠️ Common Issues & Fixes

## `/hello is not a valid command`

**Cause:** Slash command not created in Slack dashboard.
**Fix:** Create `/hello` inside **Slash Commands**.

## Slack URL verification fails

**Cause:** bot is not running OR ngrok not running.
**Fix:** Run `node bot.js` and `ngrok http 3000`, then copy the HTTPS URL into Slack.

## `missing_scope` error

**Cause:** missing OAuth scopes.
**Fix:** Add missing scopes in **OAuth & Permissions**, then reinstall app.

## Bot does not respond after code update

**Cause:** Node server was not restarted.
**Fix:** Stop the server with `CTRL + C` and restart it.

---

# 📌 Conclusion

This project demonstrates how to build a Slack bot using:

* Slack Bolt
* Slack Events API
* Slash Commands
* ngrok

The bot can:

* Respond to `/hello`
* Mention all channel members
* Log all messages received in channels

---

# 📸 Screenshots / Proof of Work

Since Slack workspaces are private by default, the best way to prove that the bot works is by providing screenshots.

Below is the list of recommended screenshots to include in this repository:


---

## 1️⃣ OAuth & Permissions (Scopes)

📌 Screenshot showing the **Bot Token Scopes** added:

* `chat:write`
* `channels:history`
* `conversations:read`
* `conversations.members`

![OAuth Scopes Screenshot](<screenshoots/Authorizations.png>)


---

## 2️⃣ Slash Commands Configuration

📌 Screenshot showing the slash commands created:

* `/hello`
* `/ping`
* `/help`
* `/about`
* `/echo`
* `/remindme`

📷 *(Insert screenshot here)*
![Slack commands](<screenshoots/Slack-commands.png>)

---

## 3️⃣ Event Subscriptions

📌 Screenshot showing:

* **Enable Events = ON**
* Request URL validated successfully (Verified)
* Subscribed event: `message.channels`

---

## 4️⃣ ngrok Running
📌 Screenshot of the terminal showing the ngrok HTTPS URL:
![Ngrok](<screenshoots/Ngrok.png>)

---

## 5️⃣ Node.js Bot Running

📌 Screenshot of your terminal showing:

* `⚡️ Slack bot is running on port 3000`

![Running bot](screenshoots/Running-bot.png)
---

## 7️⃣ Slack Channel Tests

📌 Screenshot of the Slack channel showing successful command execution:


📷 *(Insert screenshot here)*
Hello command
![Hello command 1](screenshoots/Hello-command-1.png)
![Hello command 2](screenshoots/Hello-command-2.png)
About command
![About command 1](screenshoots/About-command-1.png)
![About command 2](screenshoots/About-command-2.png)
Echo command
![Echo command 1](screenshoots/Echo-command-1.png) 
![Echo command 2](screenshoots/Echo-command-2.png)
Ping command
![Ping command 1](screenshoots/Ping-command-1.png)
![Ping command 2](screenshoots/Ping-command-2.png)
Remindme command
![Remindme command 1](screenshoots/Remindme-command-1.png) 
![Remindme command 2](screenshoots/Remindme-command-2.png)
![Remindme command 3](screenshoots/Remindme-command-3.png) 

# 📚 References

* Slack API Documentation: [https://api.slack.com/](https://api.slack.com/)
* Bolt for JavaScript: [https://slack.dev/bolt-js/](https://slack.dev/bolt-js/)
* Slack Events API Guide: [https://api.slack.com/apis/connections/events-api](https://api.slack.com/apis/connections/events-api)
* ngrok: [https://ngrok.com/](https://ngrok.com/)
