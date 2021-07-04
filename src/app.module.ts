import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './app/user/user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: false,
    }),
    CqrsModule,
  ],
  providers: [UserResolver],
})
export class AppModule {
}