import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track';
import { TrackResolver } from './track.resolver';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  providers: [TrackResolver, TrackService],
})
export class TrackModule {}
