import { INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../app.module';

describe('Feature: create a todo', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Scenario: happy path', () => {
    it('should create a todo', async () => {
      const response = await request(app.getHttpServer())
        .post('/todos')
        .send({ title: 'title-1' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: response.body.id,
        title: response.body.title,
      });
    });
  });
});
