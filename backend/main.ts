import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import { registerIpc } from './ipc';
import { loadConfig } from './config';
import { createLogger } from './logging';

const logger = createLogger('main');
let win: BrowserWindow | null = null;

const createWindow = () => {
  const branding = loadConfig().branding;
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: branding.name,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  const url =
    process.env.VITE_DEV_SERVER_URL ||
    `file://${path.join(__dirname, '../frontend/index.html')}`;
  win.loadURL(url);
};

app.whenReady().then(() => {
  if (!app.requestSingleInstanceLock()) {
    app.quit();
    return;
  }
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
  registerIpc(ipcMain);
});

app.on('window-all-closed', () => {
  app.quit();
});
