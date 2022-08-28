import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { FileMap } from 'src/file-map/file-map';
import { FileMapService } from 'src/file-map/file-map.service';
import { User } from './user';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private fileMapService: FileMapService,
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

  @ResolveField('uploadedTracks', () => [FileMap])
  async getUserUploadedTracks(@Parent() user: User) {
    return await this.fileMapService.getUserUploadedMaps(user.email);
  }
}
