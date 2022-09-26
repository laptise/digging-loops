import { Module } from '@nestjs/common';
import { EventsModule } from 'src/events/events.module';
import { FileMapModule } from 'src/file-map/file-map.module';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';

@Module({
  imports: [FileMapModule, EventsModule],
  providers: [S3Service],
  controllers: [S3Controller],
  exports: [S3Service],
})
export class S3Module {}
