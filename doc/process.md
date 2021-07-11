## Iniciar un projecto con nest grapql

```bash
npm i -g @nestjs/cli
nest new my-proyect
npm install --save @nestjs/cqrs
npm i @nestjs/graphql graphql-tools graphql apollo-server-express
npm i --save class-validator class-transformer
```

create file src/app/user/user.type.ts

```javascript
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserType {
  @Field()
  id: string;

  @Field()
  name: string;
}

```

create file src/app/user/user.resolver.ts

```javascript
import { Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';

@Resolver((of) => UserType)
export class UserResolver {
  @Query((returns) => UserType)
  async user() {
    return { id: '123', name: 'Guillermo' };
  }
}

```

replace app.module

```javascript
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './app/user/user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: true,
    }),
    CqrsModule,
  ],
  providers: [UserResolver],
})
export class AppModule {
}

```

run server

```bash
npm run start:dev
```

open link
http://localhost:3000/graphql

## generate user module

```bash
nest g mo modules/user
```

install ddd-base library and cli tools

```bash
npm i --save base-ddd
npm i -g generate-code-ddd
```

## install firebase firestore

```bash
npm install -g firebase-tools
```

select firestore para inciar con firestore necesitamos 4 archivos de configuracion,

- .firebasrc
- firebase.json (aqui es donde vamos a configurar los puertos del emulador)
- firebase.indexes.json
- firestore.rules

iniciamos el emulador ojo :  debes tener instaldo java  https://openjdk.java.net/install/

  ```bash
firebase emulators:start --only firestore
 ```

### instalar firestore orm

```bash
npm install firebase-admin fireorm reflect-metadata
nest g cl modules/share/infrastructure/firebase --no-spec
```

replace class

```javascript
import admin from 'firebase-admin';
import * as fireorm from 'fireorm';

export abstract class Firebase {
  protected initDefaultApp(): void {
    if (!Firebase.isAppInit('[DEFAULT]')) {
      admin.initializeApp({
        projectId: 'test',
        credential: admin.credential.applicationDefault(),
      });
      const firestore = admin.firestore();
      fireorm.initialize(firestore);
    }
  }

  public static isAppInit(name: string): boolean {
    if (admin.apps.length === 0) {
      return false;
    }
    let isInit = false;
    admin.apps.forEach((app) => {
      if (app.name === name) {
        isInit = true;
      }
    });
    return isInit;
  }
}

```

aqui mas odcumentacion de la integraion del ORM

# CLI RUN

## vamos a genenerar los value object y aggregate del usuario

corremos el cli y cerramos ctrl+c para que se genere la carpeta de configuracion

```bash
flab
```

change ./config-cli/user-yml path: src/modules/user for generate code in user module

```bash
flab
```

corremos la terminal, elegimos el aggregtae User y generamos las propiedades, aggregate y responses

```bash
? Select aggregate (Use arrow keys)
❯ User 

  3) Generate Propertie
  4) Create Aggregate
  5) Create Response
  6) Create Repository
```

esto va a generar clases dentro de src/modules/user/ se arma la arquitectura hexagonal

- application (casos de uso)
- domain (value oject, aggregtae y eventos)
- infrastrcture ( persistencia a la base de datos)

agregamos la clase "UserFirestoreRepository" en userModule

``` javascript
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [UserFirestoreRepository]
})
export class UserModule {}

```

## persit a user
generate a cqrs command called create, select only propertie User:name
```bash
flab
```
esto genera 3 archivos, en user/application/create
- user-create.command
- user-create.handler
- user-create.service

debes registrar lso inject generados al modulo para que sea usado
```javascript
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserFirestoreRepository } from './infrastructure/persistence/user-firestore.repository';
import { UserCreateService } from './application/create/user-create.service';
import { UserCreateHandler } from './application/create/user-create.handler';

export const CommandHandlers = [UserCreateHandler];
export const QueryHandlers = [];
export const Services = [UserCreateService];

@Module({
  imports: [CqrsModule],
  providers: [
    UserFirestoreRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Services,
  ],
})
export class UserModule {}

```