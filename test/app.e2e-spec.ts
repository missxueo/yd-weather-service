import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/areas/{areaCode} (GET)', () => {
    return request(app.getHttpServer())
      .get('/areas/101210101')
      .expect(200)
      .expect({
        code: 200,
      });
  });

  it('async-select', () => {
    

  })
});
