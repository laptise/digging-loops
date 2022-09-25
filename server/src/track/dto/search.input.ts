import { SearchTrackPayload } from '@dtos';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class TrackSearchInput implements SearchTrackPayload {
  @IsString()
  @Field()
  ownerId: string;
  @IsNotEmpty()
  @Field()
  type: number;
}
