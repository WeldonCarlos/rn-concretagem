import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { sep } from 'node:path';

export function normalizeTheme(value = '') {
  const name = String(value).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (name === 'natal') return 'natal';
  if (['reveillon', 'reveion', 'revelion', 'ano-novo'].includes(name)) return 'reveillon';
  return 'padrao';
}

// Only this public setting is returned. Never serialize the environment file.
export function parseThemeEnv(text) {
  const match = text.match(/^\s*RN_THEME\s*=\s*([^\r\n]*)/m);
  const value = (match?.[1] || '').split('#')[0].trim().replace(/^(['"])(.*)\1$/, '$2');
  return { theme: normalizeTheme(value) };
}

export async function readThemeConfig(root) {
  try { return parseThemeEnv(await readFile(new URL('.env', root), 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return { theme: 'padrao' }; throw error; }
}

export function runtimeThemePlugin() {
  let root;
  const middleware = (server) => { server.middlewares.use(async (req, res, next) => {
    if (req.url?.split('?')[0] !== '/site-theme.json') return next();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    try { res.end(JSON.stringify(await readThemeConfig(root))); }
    catch { res.statusCode = 503; res.end('{"theme":"padrao"}'); }
  }); };
  return { name: 'rn-runtime-theme', configResolved: (config) => { root = pathToFileURL(config.root + sep); }, configureServer: middleware, configurePreviewServer: middleware };
}
