import { ipcMain } from 'electron';
import { hostname } from 'os';

export const attachIpProcess = () => {
  ipcMain.on('ping', (event) => {
    event.reply('ping-reply', `Pong from ${hostname()}`);
  });
};
