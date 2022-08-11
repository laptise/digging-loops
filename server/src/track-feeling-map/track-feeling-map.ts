import { TrackFeelingMap as IF } from '@entities';
import { ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class TrackFeelingMap implements IF {
  @PrimaryColumn('bigint')
  trackId: number;
  @PrimaryColumn('bigint')
  feelingId: number;
}
