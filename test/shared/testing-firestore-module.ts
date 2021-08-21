import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { FirestoreService } from '../../src/share/infrastructure/firestore/firestore.service';

export interface CreateTestingFirestoreInterface {
  app: INestApplication;
  firestoreService: FirestoreService;
}

export class TestingFirestoreModule {
  static async create(): Promise<CreateTestingFirestoreInterface> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app: INestApplication = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
    return {
      app,
      firestoreService: moduleFixture.get<FirestoreService>(FirestoreService),
    };
  }
}
