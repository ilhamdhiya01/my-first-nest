import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/common/prisma.service';

describe('User Controller', () => {
  let app: INestApplication<App>;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = app.get(PrismaService);
    await app.init();

    await prismaService.user.deleteMany({});
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /api/users', () => {
    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/register')
        .send({
          username: '',
          password: '',
          name: '',
        })
        .expect(400);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to register', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/register')
        .send({
          username: 'ilhamdhiya01',
          password: 'ilhamdhiya01',
          name: 'ilham',
        })
        .expect(200);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('ilhamdhiya01');
      expect(response.body.data.name).toBe('ilham');
    });

    it('should be rejected if login request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: '',
          password: '',
        })
        .expect(400);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to login', async () => {
      await request(app.getHttpServer()).post('/api/users/register').send({
        username: 'ilhamdhiya01',
        password: 'ilhamdhiya01',
        name: 'ilham',
      });

      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'ilhamdhiya01',
          password: 'ilhamdhiya01',
        })
        .expect(200);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('ilhamdhiya01');
      expect(response.body.data.name).toBe('ilhamdhiya01');
      expect(response.body.data.token).toBeDefined();
    });
  });
});
