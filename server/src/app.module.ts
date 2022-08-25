import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Dictionary } from './dictionary/dictionary';
import { DictionaryModule } from './dictionary/dictionary.module';
import { FeelingMst } from './feeling-mst/feeling-mst';
import { FeelingMstModule } from './feeling-mst/feeling-mst.module';
import { S3Module } from './s3/s3.module';
import { SoundMst } from './sound-mst/sound-mst';
import { TrackFeelingMap } from './track-feeling-map/track-feeling-map';
import { TrackSoundMap } from './track-sound-map/track-sound-map';
import { TrackTagMap } from './track-tag-map/track-tag-map';
import { Track } from './track/track';
import { TrackModule } from './track/track.module';
import { User } from './user/user';
import { UserModule } from './user/user.module';
import { FileMapModule } from './file-map/file-map.module';
import { FileMap } from './file-map/file-map';

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
      host: process.env.DB_HOST,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
      port: Number(process.env.DB_PORT),
      entities: [
        Track,
        User,
        Dictionary,
        FeelingMst,
        SoundMst,
        TrackFeelingMap,
        TrackSoundMap,
        TrackTagMap,
        FileMap,
      ],
      synchronize: false,
    }),
    TrackModule,
    S3Module,
    UserModule,
    AuthModule,
    DictionaryModule,
    FeelingMstModule,
    FileMapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
