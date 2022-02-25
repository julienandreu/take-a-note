const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('appContext', {
  sendPing: () => ipcRenderer.send('ping'),
  onPingReceive: (callback) => ipcRenderer.on('ping-reply', (event, arg) => callback(arg)),
});
