import { appContext } from 'src/preload';

declare global {
  interface Window {
    appContext: typeof appContext;
  }
}
