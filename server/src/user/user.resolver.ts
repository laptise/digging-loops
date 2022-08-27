import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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
  @ResolveField('uploadedTracks', () => [FileMap])
  async getUserUploadedTracks(@Parent() user: User) {
    return await this.fileMapService.getUserUploadedMaps(user.email);
  }
}
