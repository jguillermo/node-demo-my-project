import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from './user/user.module';
import { ShareModule } from './share/share.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: true,
    }),
    CqrsModule,
    ProductModule,
    UserModule,
    ShareModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
