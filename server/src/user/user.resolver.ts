import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { FileMapService } from 'src/file-map/file-map.service';
import { Track } from 'src/track/track';
import { TrackService } from 'src/track/track.service';
import { User } from './user';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private fileMapService: FileMapService,
    private trackService: TrackService,
  ) {}

  @Query(() => User)
  async getUser(@Args('id') id: string) {
    return await this.userService.getByEmail(id);
  }

  @UseGuards(JwtAuthGuard) //
  @Query(() => User)
  async getProfile(@CurrentUser() user: User) {
    return await this.getUser(user.email);
  }

  @ResolveField('uploadedTracks', () => [Track])
  async getUserUploadedTrackss(@Parent() user: User) {
    return await this.trackService.getUserUploadedTracks(user.email);
  }
}
