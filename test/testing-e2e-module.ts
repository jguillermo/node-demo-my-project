import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { UserRepository } from '../src/user/domain/user.repository';

export interface CreateTestingInterface {
  app: INestApplication;
  userRepository: UserRepository;
}

export class TestingE2eModule {
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
    };
  }
}
