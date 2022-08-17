import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track';
import { TrackResolver } from './track.resolver';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  providers: [TrackResolver, TrackService, S3Service],
  controllers: [TrackController],
})
export class TrackModule {}
