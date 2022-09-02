import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';
import { FileMapService } from 'src/file-map/file-map.service';
import { FileMapModule } from 'src/file-map/file-map.module';
import { EventsModule } from 'src/events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from 'src/track/track';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), FileMapModule, EventsModule],
  providers: [S3Service],
  controllers: [S3Controller],
  exports: [S3Service],
})
export class S3Module {}
