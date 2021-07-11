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
export class AppModule {}

```

run server 
```bash
npm run start:dev
```
open link 
http://localhost:3000/graphql

##generate user module
```bash
nest g mo modules/user
```
install ddd-base library and cli tools
```bash
npm i --save base-ddd
npm i -g generate-code-ddd
```

run cli
```bash
flab
```
change ./config-cli/user-yml path: src/modules/user for generate code in user module

run cli to generate response and aggregate
```bash
flab

##install firebase firestore

para esto debes estar logueado en firebase https://console.firebase.google.com/

```bash
npm install -g firebase-tools

firebase --version

firebase login

firebase init
```
select firestore
para inciar con firestore necesitamos 4 archivos de configuracion,
- .firebasrc
- firebase.json (aqui es donde vamos a configurar los puertos del emulador)
- firebase.indexes.json
- firestore.rules

 iniciamos el emulador
 ojo :  debes tener instaldo java  https://openjdk.java.net/install/
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

export abstract class Firebase {
  protected initDefaultApp(): void {
    if (!Firebase.isAppInit('[DEFAULT]')) {
      admin.initializeApp({
        projectId: 'test',
        credential: admin.credential.applicationDefault(),
      });
    }
  }

  public static isAppInit(name: string): boolean {
    if (admin.apps.length === 0) {
      return false;
    }
    let isInit = false;
    admin.apps.forEach(app => {
      if (app.name === name) {
        isInit = true;
      }
    });
    return isInit;
  }
}
```
