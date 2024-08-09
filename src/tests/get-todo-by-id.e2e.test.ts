import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('Feature: get a todo', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Scenario: happy path', () => {
    it('should get a todo', async () => {
      const createdTodoResponse = await request(app.getHttpServer())
        .post('/todos')
        .send({ title: 'title-1' });

      const response = await request(app.getHttpServer()).get(
        `/todos/${createdTodoResponse.body.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: response.body.id, title: 'title-1' });
    });
  });
});
