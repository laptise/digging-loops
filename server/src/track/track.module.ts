import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track';
import { TrackResolver } from './track.resolver';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { S3Service } from 'src/s3/s3.service';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), S3Module],
  providers: [TrackResolver, TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
