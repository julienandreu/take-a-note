import { proxy } from 'valtio';
import { pingStore } from './ping.store';

export const state = proxy({
  ping: pingStore,
});
