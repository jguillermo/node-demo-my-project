import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { UserRepository } from '../src/modules/user/domain/user.repository';
import { FirestoreService } from '../src/modules/share/infrastructure/firestore/firestore.service';

export interface CreateTestingInterface {
  app: INestApplication;
  userRepository: UserRepository;
  firestoreService: FirestoreService;
}

export class TestingE2EModule {
  static async create(): Promise<CreateTestingInterface> {
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
      userRepository: moduleFixture.get<UserRepository>(UserRepository),
      firestoreService: moduleFixture.get<FirestoreService>(FirestoreService),
    };
  }
}
