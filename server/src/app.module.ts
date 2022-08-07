import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { camelCase } from 'typeorm/util/StringUtils';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Track } from './track/track';
import { S3Module } from './s3/s3.module';
import { UserModule } from './user/user.module';
import { User } from './user/user';
import { SampleModule } from './sample/sample.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
const namingStrategy = new (class
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName || camelCase(targetName);
  }
})();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'dl_db',
      username: 'root',
      password: process.env.ROOT_PASSWORD,
      database: 'digging_loops',
      entities: [Track, User],
      namingStrategy,
      synchronize: true,
    }),
    TrackModule,
    S3Module,
    UserModule,
    SampleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
