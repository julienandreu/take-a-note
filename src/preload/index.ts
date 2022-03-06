import { contextBridge } from 'electron';
import { rendererRegistry } from './renderer-registry';

export const appContext = {
  fileOpen: () => {
    rendererRegistry.send('file.open');
  },
  onFileOpenSucess: (callback: (filePaths: string[]) => void) =>
    rendererRegistry.on('file.open.success', (event, filePaths) => callback(filePaths)),
  onFileOpenError: (callback: (error: Error) => void) =>
    rendererRegistry.on('file.open.error', (event, error) => callback(error)),
  fileRead: (path: string) => {
    rendererRegistry.send('file.read', path);
  },
  onFileReadSucess: (callback: (content: string) => void) =>
    rendererRegistry.on('file.read.success', (event, content) => callback(content)),
  onFileReadError: (callback: (error: Error) => void) =>
    rendererRegistry.on('file.read.error', (event, error) => callback(error)),
  fileSave: () => {
    rendererRegistry.send('file.save');
  },
  onFileSaveSucess: (callback: (filePath: string) => void) =>
    rendererRegistry.on('file.save.success', (event, filePath) => callback(filePath)),
  onFileSaveError: (callback: (error: Error) => void) =>
    rendererRegistry.on('file.save.error', (event, error) => callback(error)),
  fileWrite: (path: string, content: string) => {
    rendererRegistry.send('file.write', path, content);
  },
  onFileWriteSucess: (callback: (filePath: string) => void) =>
    rendererRegistry.on('file.write.success', (event, filePath) => callback(filePath)),
  onFileWriteError: (callback: (error: Error) => void) =>
    rendererRegistry.on('file.write.error', (event, error) => callback(error)),
};

contextBridge.exposeInMainWorld('appContext', appContext);
