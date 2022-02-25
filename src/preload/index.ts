import { AppContext } from './../interfaces/app-context.interface';
import { contextBridge, ipcRenderer } from 'electron';

const appContext: AppContext = {
  sendPing: () => ipcRenderer.send('ping'),
  onPingReceive: (callback) => ipcRenderer.on('ping-reply', (event, arg) => callback(arg)),
};

contextBridge.exposeInMainWorld('appContext', appContext);
