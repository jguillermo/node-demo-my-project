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
```bash
 ◯ Realtime Database: Configure a security rules file for Realtime Database and (optionally) pro
vision default instance
❯◯ Firestore: Configure security rules and indexes files for Firestore
 ◯ Functions: Configure a Cloud Functions directory and its files
 ◯ Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 ◯ Hosting: Set up GitHub Action deploys
 ◯ Storage: Configure a security rules file for Cloud Storage
 ```
 - crear un proyecto nuevo en la pagina web de google "demo-my-project"
 - crear una base de datos de firestore
```bash
? Please select an option: (Use arrow keys)
❯ Use an existing project 
  Create a new project 
  Add Firebase to an existing Google Cloud Platform project 
  Don't set up a default project 
 ```
 ```bash
? Please select an option: (Use arrow keys)
? Please select an option: Use an existing project
❯  Using project fir-my-project-34254 (demo-my-project)
 ```
 iniciamos el emulador
 ojo :  debes tener instaldo java  https://openjdk.java.net/install/
  ```bash
firebase emulators:start --only firestore
 ```