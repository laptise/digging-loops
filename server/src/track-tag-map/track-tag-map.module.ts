import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackTagMap } from './track-tag-map';
import { TrackTagMapService } from './track-tag-map.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackTagMap])],
  providers: [TrackTagMapService],
  exports: [TypeOrmModule, TrackTagMapService],
})
export class TrackTagMapModule {}
