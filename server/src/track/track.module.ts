import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { FileMap } from 'src/file-map/file-map';
import { FileMapService } from 'src/file-map/file-map.service';
import { S3Module } from 'src/s3/s3.module';
import { Track } from './track';
import { TrackController } from './track.controller';
import { TrackResolver } from './track.resolver';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track, FileMap]), S3Module, EventsModule],
  providers: [TrackResolver, TrackService, FileMapService],
  controllers: [TrackController],
})
export class TrackModule {}
