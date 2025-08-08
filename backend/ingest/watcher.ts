import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import { fingerprint } from './fingerprint';
import { EventEmitter } from 'events';

export interface WatcherOptions {
  dir: string;
  stabilityMs?: number;
}

export class IngestWatcher extends EventEmitter {
  private seen = new Set<string>();
  constructor(private opts: WatcherOptions) {
    super();
  }
  start() {
    const watch = chokidar.watch(this.opts.dir, {
      awaitWriteFinish: {
        stabilityThreshold: this.opts.stabilityMs || 2000
      }
    });
    watch.on('add', file => this.handleFile(file));
    fs.readdirSync(this.opts.dir).forEach(f =>
      this.handleFile(path.join(this.opts.dir, f))
    );
  }
  private async handleFile(file: string) {
    if (!fs.statSync(file).isFile()) return;
    const hash = await fingerprint(file);
    if (this.seen.has(hash)) return;
    this.seen.add(hash);
    this.emit('file', file);
  }
}
