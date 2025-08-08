import { EventEmitter } from 'events';
import os from 'os';

type Job = () => Promise<void>;

export class JobQueue extends EventEmitter {
  private queue: Job[] = [];
  private running = 0;
  private maxParallel = Math.max(1, os.cpus().length - 1);

  enqueue(job: Job) {
    this.queue.push(job);
    this.process();
  }

  private process() {
    if (this.running >= this.maxParallel) return;
    const job = this.queue.shift();
    if (!job) return;
    this.running++;
    job()
      .catch(err => this.emit('error', err))
      .finally(() => {
        this.running--;
        this.emit('progress', {
          remaining: this.queue.length,
          running: this.running
        });
        this.process();
      });
  }

  drain() {
    this.queue = [];
  }
}
