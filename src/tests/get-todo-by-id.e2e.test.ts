import * as request from 'supertest';

import { e2eTodoSeeds } from './seeds/todo-seeds.e2e';
import { e2eUserSeeds } from './seeds/user-seeds.e2e';
import { TestApp } from './utils/test-app';

describe('Feature: get a todo', () => {
  let app: TestApp;

  // const todo1 = new Todo({
  //   id: 'id-1',
  //   title: 'title-1',
  // });

  beforeEach(async () => {
    app = new TestApp();
    await app.setup();
    await app.loadFixtures([e2eUserSeeds.alex, e2eTodoSeeds.todo1]);
  });

  afterEach(async () => {
    await app.cleanup();
  });

  describe('Scenario: happy path', () => {
    const todo1 = e2eTodoSeeds.todo1;

    it('should get a todo', async () => {
      const response = await request(app.getHttpServer()).get(
        `/todos/${todo1.entity.props.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(todo1.entity.props);
    });
  });
});
