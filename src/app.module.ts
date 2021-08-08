import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CqrsModule } from '@nestjs/cqrs';
import { UserResolver } from './app/user/user.resolver';
import { AppEvents } from './event/events';
import { UserModule } from './modules/user/user.module';
import { ShareModule } from './modules/share/share.module';

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
  controllers: [],
  providers: [UserResolver, ...AppEvents],
})
export class AppModule {}
