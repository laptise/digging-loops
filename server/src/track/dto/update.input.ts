import { SearchTrackPayload, TrackUpdatePayload } from '@dtos';
import { Tag } from '@entities';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class TrackUpdateInput implements TrackUpdatePayload {
  id: number;
  @IsString()
  ownerId: string;
  @IsNotEmpty()
  type: number;
  tags: Tag[];
}
