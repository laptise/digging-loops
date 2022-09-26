import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { FileMapModule } from 'src/file-map/file-map.module';
import { FileMapService } from 'src/file-map/file-map.service';
import { S3Module } from 'src/s3/s3.module';
import { TagModule } from 'src/tag/tag.module';
import { TagService } from 'src/tag/tag.service';
import { TrackTagMapModule } from 'src/track-tag-map/track-tag-map.module';
import { TrackTagMapService } from 'src/track-tag-map/track-tag-map.service';
import { Track } from './track';
import { TrackController } from './track.controller';
import { TrackResolver } from './track.resolver';
import { TrackService } from './track.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    TrackTagMapModule,
    FileMapModule,
    S3Module,
    EventsModule,
    TagModule,
  ],
  providers: [
    TrackResolver,
    TrackService,
    FileMapService,
    TrackTagMapService,
    TagService,
  ],
  controllers: [TrackController],
  exports: [TypeOrmModule, TrackService],
})
export class TrackModule {}
