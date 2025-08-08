import { IpcMain } from 'electron';
import { EventEmitter } from 'events';

export enum IPCChannels {
  QUEUE_PROGRESS = 'QUEUE_PROGRESS',
  QUEUE_COMPLETE = 'QUEUE_COMPLETE'
}

const emitter = new EventEmitter();

export const ipcBus = emitter;

export const registerIpc = (ipc: IpcMain) => {
  ipc.handle('ping', () => 'pong');
};
