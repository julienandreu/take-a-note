const { ipcMain } = require('electron')
const os = require('os');

ipcMain.on('ping', (event, arg) => {
  event.reply('ping-reply', `Pong from ${os.hostname()}`)
})