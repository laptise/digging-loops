import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackTagMap } from 'src/track-tag-map/track-tag-map';
import { TrackTagMapModule } from 'src/track-tag-map/track-tag-map.module';
import { TrackModule } from 'src/track/track.module';
import { TrackService } from 'src/track/track.service';
import { User } from './user';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TrackTagMapModule, TrackModule],
  providers: [UserService, UserResolver, TrackService],
})
export class UserModule {}
