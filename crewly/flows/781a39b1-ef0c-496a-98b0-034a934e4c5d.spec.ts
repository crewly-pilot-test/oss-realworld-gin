import { test, expect } from '@playwright/test';

const base = process.env.CREWLY_BASE_URL!;

test('popular tags come back in alphabetical order', async ({ request }) => {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const signup = await request.post(base + '/api/users', {
    data: { user: { username: 'u' + id, email: id + '@example.test', password: 'password-' + id } },
  });
  expect(signup.status()).toBe(201);
  const token = (await signup.json()).user.token;

  const created = await request.post(base + '/api/articles', {
    headers: { Authorization: 'Token ' + token },
    data: {
      article: {
        title: 'Tag order ' + id,
        description: 'tags',
        body: 'checking tag order',
        tagList: ['zeta-' + id, 'alpha-' + id, 'mid-' + id],
      },
    },
  });
  expect(created.status()).toBe(201);

  const res = await request.get(base + '/api/tags');
  expect(res.status()).toBe(200);
  const tags: string[] = (await res.json()).tags;
  expect(tags).toEqual(expect.arrayContaining(['alpha-' + id, 'mid-' + id, 'zeta-' + id]));
  expect(tags).toEqual([...tags].sort());
});
