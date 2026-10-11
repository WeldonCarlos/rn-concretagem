import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { normalizeTheme, parseThemeEnv, readThemeConfig } from '../scripts/theme-config.ts';
import { validateTheme } from '../src/types/theme.ts';

test('three themes and user-friendly aliases; invalid input falls back to standard', () => {
  for (const value of ['reveillon','réveillon','reveion','REVEILLON']) assert.equal(normalizeTheme(value),'reveillon');
  assert.equal(normalizeTheme('natal'),'natal');
  assert.equal(normalizeTheme('padrão'),'padrao');
  assert.equal(normalizeTheme('anything-else'),'padrao');
  assert.equal(validateTheme({theme:'<script>'}),'padrao');
});
test('public config exposes only the selected theme, never secrets', () => {
  assert.deepEqual(parseThemeEnv('SECRET_KEY=private\nRN_THEME="natal" # Christmas\nDB_PASSWORD=private'),{theme:'natal'});
  assert.deepEqual(parseThemeEnv('SECRET_KEY=private'),{theme:'padrao'});
});
test('rereads environment after an edit without restarting or rebuilding', async () => {
  const dir = await mkdtemp(join(tmpdir(),'rn-theme-'));
  const root = pathToFileURL(dir + '/');
  try {
    assert.deepEqual(await readThemeConfig(root),{theme:'padrao'});
    await writeFile(join(dir,'.env'),'RN_THEME=natal');
    assert.deepEqual(await readThemeConfig(root),{theme:'natal'});
    await writeFile(join(dir,'.env'),'RN_THEME=reveion');
    assert.deepEqual(await readThemeConfig(root),{theme:'reveillon'});
  } finally { await rm(dir,{recursive:true,force:true}); }
});
