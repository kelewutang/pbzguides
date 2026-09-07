import assert from 'node:assert/strict';
import { access, readFile, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const fixture = new URL('../src/content/guides/validation-fixture.md', import.meta.url);
const fixtureOutput = new URL('../dist/guides/validation-fixture/index.html', import.meta.url);
const fixtureUrl = 'https://pbzguides.com/guides/validation-fixture/';
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const build = () => execFileSync(npm, ['run', 'build'], { stdio: 'inherit' });

try {
  await access(fixture);
  throw new Error('Regression fixture already exists; refusing to overwrite source content.');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

let fixtureCreated = false;
try {
  await writeFile(fixture, `---
title: Build hygiene validation fixture
description: Temporary generic fixture used only to verify static output cleanup.
slug: validation-fixture
status: published
updatedAt: 2026-09-07
sources:
  - label: Example documentation
    url: https://example.com/
---

This temporary generic fixture verifies static build cleanup.
`);
  fixtureCreated = true;
  build();
  await access(fixtureOutput);
  assert((await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8')).includes(fixtureUrl), 'Published fixture URL missing from sitemap');

  await rm(fixture);
  fixtureCreated = false;
  build();
  await assert.rejects(access(fixtureOutput), { code: 'ENOENT' }, 'Removed fixture HTML remains in dist');
  assert(!(await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8')).includes(fixtureUrl), 'Removed fixture URL remains in sitemap');
  console.log('PASS: published fixture output and sitemap URL are removed by the next production build.');
} finally {
  if (fixtureCreated) await rm(fixture, { force: true });
  build();
}
