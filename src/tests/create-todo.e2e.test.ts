import * as request from 'supertest';

import { e2eUserSeeds } from './seeds/user-seeds.e2e';
import { TestApp } from './utils/test-app';

describe('Feature: create a todo', () => {
  let app: TestApp;

  beforeEach(async () => {
    app = new TestApp();
    await app.setup();
    await app.loadFixtures([e2eUserSeeds.alex]);
  });

  afterEach(async () => {
    await app.cleanup();
  });

  describe('Scenario: happy path', () => {
    it('should create a todo', async () => {
      const response = await request(app.getHttpServer())
        .post('/todos')
        .set('Authorization', e2eUserSeeds.alex.createAuthorizationToken())
        .send({ title: 'title-1' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: response.body.id,
        title: response.body.title,
      });
    });

    it('should return 403 if the user is not authenticated', async () => {
      const response = await request(app.getHttpServer())
        .post('/todos')
        .send({ title: 'title-1' });

      expect(response.status).toBe(403);
    });
  });
});
