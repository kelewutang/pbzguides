import assert from 'node:assert/strict';
import { access, readFile, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const areas = ['guides', 'weapons', 'bosses', 'combat', 'characters'];
const fixtures = areas.map((area) => ({
  area,
  source: new URL(`../src/content/${area}/validation-fixture.md`, import.meta.url),
  output: new URL(`../dist/${area}/validation-fixture/index.html`, import.meta.url),
  url: `https://pbzguides.com/${area}/validation-fixture/`,
}));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const build = () => execFileSync(npm, ['run', 'build'], { stdio: 'inherit' });
const fixtureContent = (status) => `---
title: Build hygiene validation fixture
description: Temporary generic fixture used only to verify static output cleanup.
slug: validation-fixture
status: ${status}
updatedAt: 2026-09-08
---

This temporary generic fixture verifies static build cleanup.
`;

for (const fixture of fixtures) {
  try {
    await access(fixture.source);
    throw new Error(`Regression fixture already exists in ${fixture.area}; refusing to overwrite source content.`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

try {
  await Promise.all(fixtures.map((fixture) => writeFile(fixture.source, fixtureContent('published'))));
  build();
  const publishedSitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  for (const fixture of fixtures) {
    await access(fixture.output);
    assert(publishedSitemap.includes(fixture.url), `Published ${fixture.area} fixture URL missing from sitemap`);
  }

  await writeFile(fixtures[0].source, fixtureContent('draft'));
  await Promise.all(fixtures.slice(1).map((fixture) => rm(fixture.source)));
  build();
  const unpublishedSitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  for (const fixture of fixtures) {
    await assert.rejects(access(fixture.output), { code: 'ENOENT' }, `Unpublished ${fixture.area} fixture HTML remains in dist`);
    assert(!unpublishedSitemap.includes(fixture.url), `Unpublished ${fixture.area} fixture URL remains in sitemap`);
  }
  console.log('PASS: all content families generate published fixture routes; draft and removed fixtures disappear after the next production build.');
} finally {
  await Promise.all(fixtures.map((fixture) => rm(fixture.source, { force: true })));
  build();
}
