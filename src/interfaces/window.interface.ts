import { AppContext } from './app-context.interface';

declare global {
  interface Window {
    appContext: AppContext;
  }
}
