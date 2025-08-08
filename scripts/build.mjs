import { spawnSync } from 'child_process';

spawnSync('tsc', ['-p', 'backend/tsconfig.json'], { stdio: 'inherit', shell: true });
spawnSync('tsc', ['-p', 'app/frontend/tsconfig.json'], { stdio: 'inherit', shell: true });
spawnSync('vite', ['build', '--config', 'app/frontend/vite.config.ts'], { stdio: 'inherit', shell: true });
