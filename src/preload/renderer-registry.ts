import { IpcRenderer, ipcRenderer, IpcRendererEvent } from 'electron';
import { MainEvents } from 'src/main/main-registry';

type IpcMainEventListener = (event: IpcRendererEvent, ...args: any[]) => any;

export interface RendererEvents extends MainEvents {
  'file.open.success': (filePaths: string[]) => void;
  'file.open.error': (error: Error) => void;
  'file.read.success': (content: string) => void;
  'file.read.error': (error: Error) => void;
}

interface MainRegistry<T> extends Omit<IpcRenderer, 'on' | 'send'> {
  on<C extends keyof T>(
    channel: C,
    listener: (
      event: IpcRendererEvent,
      ...args: T[C] extends (...args: any[]) => any ? Parameters<T[C]> : never
    ) => ReturnType<T[C] extends (...args: any[]) => any ? T[C] : never>,
  ): void;
  send<C extends keyof T>(channel: C, ...args: T[C] extends (...args: any[]) => any ? Parameters<T[C]> : never): void;
}

const { on, send, ...cleanedIpcMain } = ipcRenderer;

export const rendererRegistry: MainRegistry<RendererEvents> = {
  ...cleanedIpcMain,
  on: (channel, listener) => {
    ipcRenderer.on(channel, listener as IpcMainEventListener);
  },
  send: (channel, ...args) => {
    ipcRenderer.send(channel, ...args);
  },
};
