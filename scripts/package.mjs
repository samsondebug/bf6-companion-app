import { spawnSync } from 'child_process';

spawnSync('npm', ['run', 'build'], { stdio: 'inherit', shell: true });
spawnSync('electron-builder', ['--win', 'nsis'], { stdio: 'inherit', shell: true });
