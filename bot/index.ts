// import TelegramBot from 'node-telegram-bot-api';
// const token = '8194675128:AAH8Qa3aq_8owMFNR0y0rKJP7MfpBz_K0Aw';
// const bot = new TelegramBot(token, {polling: true});

// bot.onText(/\/echo (.+)/, (msg, match) => {

//   if(!match) 
//     return
//   const chatId = msg.chat.id;
//   const resp = match[1]; 
//   bot.sendMessage(chatId, resp);
// });


// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;  
//   bot.sendMessage(chatId, 'Received your message');
// });