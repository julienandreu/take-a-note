import { proxy } from 'valtio';
import { fileStore } from './file.store';
import { pingStore } from './ping.store';

export const state = proxy({
  ping: pingStore,
  file: fileStore,
});
