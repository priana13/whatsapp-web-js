const express = require('express')
const app = express()
const port = 3000
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true});
    // console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();


app.get('/', (req, res) => {

  res.send('Selamat Data di Donat Sender!');

});



app.get('/send', (req, res) => {
  let nomor= req.query.nomor;

  number = nomor.includes('@c.us') ? nomor : `${nomor}@c.us`;

  let pesan = req.query.pesan;

  client.sendMessage(number, pesan);

  res.send('Pesan terkirim');

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})