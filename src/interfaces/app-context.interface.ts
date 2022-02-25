export interface AppContext {
  sendPing: () => void;
  onPingReceive: <C extends (...args: unknown[]) => unknown>(callback: C) => void;
}
