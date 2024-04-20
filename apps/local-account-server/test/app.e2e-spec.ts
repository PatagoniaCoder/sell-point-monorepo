import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import * as request from 'supertest';
import { LocalAccountServerModule } from './../src/local-account-server.module';
import { readFile } from 'fs';

describe('LocalAccountServerController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LocalAccountServerModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    app.setBaseViewsDir(join(__dirname, '../src/views'));
    app.setViewEngine('hbs');
    await app.init();
  });

  it('/ (GET)', () => {
    let htmlFile = '';
    readFile(
      join(__dirname, '../src/views/index.hbs'),
      'utf-8',
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        htmlFile = data;
      },
    );
    return request(app.getHttpServer())
      .get('/')
      .query({ state: '132', clientID: '123', redirectUri: 'redi' })
      .expect(200)
      .expect(({ text }) => {
        expect(text).toBe(htmlFile);
      });
  });
});
