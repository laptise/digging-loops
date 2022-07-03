/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Resolver } from '@nestjs/graphql';
import { Track } from './track';
import { TrackService } from './track.service';

@Resolver((of) => Track)
export class TrackResolver {
  constructor(private trackService: TrackService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
