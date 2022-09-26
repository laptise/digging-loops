import { TrackTagMap as IF } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class TrackTagMap implements IF {
  @PrimaryColumn('bigint')
  @Field(() => Number)
  trackId: number;
  @PrimaryColumn('bigint')
  @Field(() => Number)
  tagId: number;
}
