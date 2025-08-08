import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

export interface TrimOptions {
  input: string;
  output: string;
  start: number;
  duration: number;
}

export const ffprobe = (file: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const proc = spawn(process.env.FFMPEG_PATH || 'ffprobe', [
      '-v',
      'error',
      '-show_format',
      '-show_streams',
      file
    ]);
    let data = '';
    proc.stdout.on('data', d => (data += d));
    proc.on('close', code =>
      code === 0 ? resolve(data) : reject(new Error('ffprobe failed'))
    );
  });

export const trim = (opts: TrimOptions): Promise<void> =>
  new Promise((resolve, reject) => {
    const tmp = path.join(
      os.tmpdir(),
      `bf6-${Date.now()}-${path.basename(opts.output)}`
    );
    const args = [
      '-ss',
      String(opts.start),
      '-t',
      String(opts.duration),
      '-i',
      opts.input,
      '-c:v',
      'libx264',
      '-y',
      tmp
    ];
    const proc = spawn(process.env.FFMPEG_PATH || 'ffmpeg', args);
    proc.on('close', code => {
      if (code === 0) {
        fs.renameSync(tmp, opts.output);
        resolve();
      } else {
        reject(new Error('ffmpeg trim failed'));
      }
    });
  });
