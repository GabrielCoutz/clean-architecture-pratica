import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '../../infra/express/index.js';

describe('Create courses with API', () => {
  it('Should return a created course', async () => {
    const payload = { name: '', open: true };
    const response = await request(app).post('/').send(payload);

    expect(response.body.name).toBe(payload.name);
    expect(response.body.open).toBe(payload.open);
    expect(response.body.code).toBeDefined();
  });
});
