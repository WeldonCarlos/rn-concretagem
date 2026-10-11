import { mkdir, writeFile } from 'node:fs/promises';
import { readThemeConfig } from './theme-config.ts';

const root = new URL('../', import.meta.url);
const config = await readThemeConfig(root);
const json = JSON.stringify(config, null, 2) + '\n';
await mkdir(new URL('public/', root), { recursive: true });
await writeFile(new URL('public/site-theme.json', root), json);
try { await writeFile(new URL('dist/site-theme.json', root), json); }
catch (error) { if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) throw error; }
console.log(`Tema: ${config.theme}. Atualizado site-theme.json (somente configuração pública).`);
