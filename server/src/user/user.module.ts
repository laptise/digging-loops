import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { FileMapService } from 'src/file-map/file-map.service';
import { TrackService } from 'src/track/track.service';
import { FileMapModule } from 'src/file-map/file-map.module';
import { FileMap } from 'src/file-map/file-map';
import { Track } from 'src/track/track';

@Module({
  imports: [TypeOrmModule.forFeature([User, FileMap, Track])],
  providers: [UserService, UserResolver, FileMapService, TrackService],
})
export class UserModule {}
