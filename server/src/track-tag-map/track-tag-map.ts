import { TrackTagMap as IF } from '@entities';
import { ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class TrackTagMap implements IF {
  @PrimaryColumn('bigint')
  trackId: number;
  @PrimaryColumn('bigint')
  tagId: number;
}
