import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track';
import { TrackResolver } from './track.resolver';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  providers: [TrackResolver, TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
