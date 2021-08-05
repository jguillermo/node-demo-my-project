import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './app/user/user.resolver';
import { UserModule } from './modules/user/user.module';
import { ShareModule } from './modules/share/share.module';
import { AppEvents } from './event/events';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: true,
    }),
    CqrsModule,
    UserModule,
    ShareModule,
  ],
  providers: [UserResolver, ...AppEvents],
})
export class AppModule {}
