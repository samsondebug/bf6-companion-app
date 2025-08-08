import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  ping: () => ipcRenderer.invoke('ping'),
  // Add more API methods as needed
});

declare global {
  interface Window {
    api: {
      ping: () => Promise<string>;
    };
  }
}
