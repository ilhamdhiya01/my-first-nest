import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestModule } from './test.module';
import { TestService } from './test.service';

describe('User Controller', () => {
  let app: INestApplication;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    testService = app.get(TestService);
    await app.init();

    testService = app.get(TestService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /api/users', () => {
    beforeEach(async () => {
      await testService.deleteUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: '',
          password: '',
          name: '',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to register', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'johndoe',
          password: 'test',
          name: 'John Doe',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('johndoe');
      expect(response.body.data.name).toBe('John Doe');
    });

    it('should be rejected if username already exists', async () => {
      await testService.createUser();
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'johndoe',
          password: 'test',
          name: 'John Doe',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('POST /api/users/login', () => {
    it('should be rejected if request login is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: '',
          password: '',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to login', async () => {
      await testService.createUser();
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'johndoe',
          password: 'test',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('johndoe');
      expect(response.body.data.name).toBe('John Doe');
      expect(response.body.data.token).toBeDefined();
    });

    it('should be rejected if username is wrong', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'wrong',
          password: 'test',
        });

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if password is wrong', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'johndoe',
          password: 'wrong',
        });

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });
  });
});
