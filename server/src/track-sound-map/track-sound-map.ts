import { TrackSoundMap as IF } from '@entities';
import { ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class TrackSoundMap implements IF {
  @PrimaryColumn('bigint')
  trackId: number;
  @PrimaryColumn('bigint')
  soundId: number;
}
