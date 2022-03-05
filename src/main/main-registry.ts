import { readFileSync, writeFileSync } from 'fs';
import { IpcMain, ipcMain, IpcMainEvent, dialog } from 'electron';

interface IpcMainEventListenerEvent<T> extends Omit<IpcMainEvent, 'reply'> {
  reply<C extends keyof T>(channel: C, ...args: T[C] extends (...args: any[]) => any ? Parameters<T[C]> : never): void;
}

type IpcMainEventListener = (event: IpcMainEvent, ...args: any[]) => any;

export interface MainEvents {
  'file.open': () => void;
  'file.read': (path: string) => void;
  'file.save': () => void;
  'file.write': (path: string, content: string) => void;
}

export interface RendererEvents {
  'file.open.success': (filePaths: string[]) => void;
  'file.open.error': (error: Error) => void;
  'file.read.success': (content: string) => void;
  'file.read.error': (error: Error) => void;
  'file.save.success': (filePath: string) => void;
  'file.save.error': (error: Error) => void;
  'file.write.success': (filePath: string) => void;
  'file.write.error': (error: Error) => void;
}

interface MainRegistry<T> extends Omit<IpcMain, 'on' | 'send'> {
  on<C extends keyof T>(
    channel: C,
    listener: (
      event: IpcMainEventListenerEvent<T>,
      ...args: T[C] extends (...args: any[]) => any ? Parameters<T[C]> : never
    ) => ReturnType<T[C] extends (...args: any[]) => any ? T[C] : never>,
  ): void;
}

const { on, ...cleanedIpcMain } = ipcMain;

export const mainRegistry: MainRegistry<MainEvents & RendererEvents> = {
  ...cleanedIpcMain,
  on: (channel, listener) => {
    ipcMain.on(channel, listener as IpcMainEventListener);
  },
};

export const attachMainEvents = () => {
  mainRegistry.on('file.open', (event) => {
    try {
      const filePaths = dialog.showOpenDialogSync({});

      if (!Array.isArray(filePaths)) {
        throw new Error('No file selected');
      }

      event.reply('file.open.success', filePaths);
    } catch (error) {
      event.reply('file.open.error', error instanceof Error ? error : new Error(`${error}`));
    }
  });
  mainRegistry.on('file.read', (event, path) => {
    try {
      const content = readFileSync(path);

      event.reply('file.read.success', content.toString('utf8'));
    } catch (error) {
      event.reply('file.read.error', error instanceof Error ? error : new Error(`${error}`));
    }
  });
  mainRegistry.on('file.save', (event) => {
    try {
      const filePath = dialog.showSaveDialogSync({});

      console.log(filePath);

      if (!filePath) {
        throw new Error('No file selected ->' + JSON.stringify(filePath, null, 2));
      }

      event.reply('file.save.success', filePath);
    } catch (error) {
      event.reply('file.save.error', error instanceof Error ? error : new Error(`${error}`));
    }
  });
  mainRegistry.on('file.write', (event, path, content) => {
    try {
      writeFileSync(path, content);

      event.reply('file.write.success', path);
    } catch (error) {
      event.reply('file.write.error', error instanceof Error ? error : new Error(`${error}`));
    }
  });
};
