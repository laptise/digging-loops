import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { camelCase } from 'typeorm/util/StringUtils';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Dictionary } from './dictionary/dictionary';
import { DictionaryModule } from './dictionary/dictionary.module';
import { S3Module } from './s3/s3.module';
import { SampleModule } from './sample/sample.module';
import { Track } from './track/track';
import { TrackModule } from './track/track.module';
import { User } from './user/user';
import { UserModule } from './user/user.module';
import { FeelingMstModule } from './feeling-mst/feeling-mst.module';
import { FeelingMst } from './feeling-mst/feeling-mst';
import { SoundMst } from './sound-mst/sound-mst';
import { TrackFeelingMap } from './track-feeling-map/track-feeling-map';
import { TrackSoundMap } from './track-sound-map/track-sound-map';
import { TrackTagMap } from './track-tag-map/track-tag-map';
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
      entities: [
        Track,
        User,
        Dictionary,
        FeelingMst,
        SoundMst,
        TrackFeelingMap,
        TrackSoundMap,
        TrackTagMap,
      ],
      namingStrategy,
      synchronize: true,
    }),
    TrackModule,
    S3Module,
    UserModule,
    SampleModule,
    AuthModule,
    DictionaryModule,
    FeelingMstModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
