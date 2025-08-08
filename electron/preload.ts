import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("api", {
  ping: () => "pong"
});

declare global {
  interface Window {
    api: {
      ping: () => string;
    };
  }
}
