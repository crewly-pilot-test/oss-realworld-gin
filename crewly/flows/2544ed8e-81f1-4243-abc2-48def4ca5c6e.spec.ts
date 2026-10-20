import { test, expect } from '@playwright/test';

const base = process.env.CREWLY_BASE_URL!;

test('version endpoint returns a semver string', async ({ request }) => {
  const res = await request.get(base + '/api/version');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.version).toMatch(/^\d+\.\d+\.\d+$/);
  const ping = await request.get(base + '/api/ping/');
  expect(ping.status()).toBe(200);
});
