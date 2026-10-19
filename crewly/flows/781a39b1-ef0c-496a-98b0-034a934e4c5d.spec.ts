// Playwright test for approved crewly flow
// This test validates that the /api/tags endpoint returns tags in alphabetical order
// As specified in issue #1: "Return popular tags in alphabetical order"

import { test, expect } from '@playwright/test';

test('tags are returned in alphabetical order', async ({ request }) => {
  // Get tags from the API
  const response = await request.get('/api/tags');
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('tags');

  const tags = responseBody.tags;

  // Verify tags are in ascending alphabetical order
  for (let i = 0; i < tags.length - 1; i++) {
    expect(tags[i]).toBeLessThanOrEqual(tags[i + 1]);
  }
});