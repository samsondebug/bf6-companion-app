import { spawn } from 'child_process';

const procs = [
  spawn('npm', ['run', 'dev:renderer'], { stdio: 'inherit', shell: true }),
  spawn('npm', ['run', 'dev:main'], { stdio: 'inherit', shell: true })
];

procs.forEach(p => p.on('exit', code => process.exit(code ?? 0)));
