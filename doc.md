## Iniciar un projecto con nest grapql

pre requisitos
```bash
npm install -g firebase-tools
npm i -g @nestjs/cli
npm i -g generate-code-ddd
```

instalciones al proyecto
```bash
nest new my-project
cd my-project
npm install --save @nestjs/cqrs
npm i @nestjs/graphql graphql apollo-server-express@2.x.x
npm i --save class-validator class-transformer
npm i --save base-ddd
npm i firebase-admin
npm i faker --save-dev 
npm i @types/faker --save-dev
```
### 2.- update files
```bash
rm src/app.controller.ts && rm src/app.controller.spec.ts && rm src/app.service.ts
```

replace app.module.ts

```javascript
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CqrsModule } from '@nestjs/cqrs';
import { UserResolver } from './app/user/user.resolver';
import { AppEvents } from './event/events';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: true,
    }),
    CqrsModule,
  ],
  controllers: [],
  providers: [UserResolver, ...AppEvents],
})
export class AppModule {
}

```

replace main.ts

```javascript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  await app.listen(3000);
}

bootstrap();

```

### 3.- generate modules share and user
```bash
nest g mo modules/user
nest g mo modules/share
```
### 4 copy src modules
### 5 copy src app
### 5 copy src event
### 5 copy test
### 6 copy firestore-files
copy 3 files to firestore config and 1 files to firestore emulator
- .firebaserc
- firebase.json
- firestore.indexes.json
- firestore.rules

### 6 copy makefile

### 7 add runInBand test2e2
change test:e2e line package.json
```json
  "test:e2e": "jest --runInBand --verbose --config ./test/jest-e2e.json"
```

### optional
add printWidth in pretierrc
```json
"printWidth": 120
```

### run test
```bash
make
```

### run project 
```bash
firebase emulators:exec "npm run start:dev" --only firestore
```
open http://localhost:3000/graphql