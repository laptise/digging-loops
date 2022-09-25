import { Args, Query, Resolver } from '@nestjs/graphql';
import { Tag } from './tag';
import { TagService } from './tag.service';

@Resolver((of) => Tag)
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Query(() => [Tag])
  async searchTag(@Args('name') name: string) {
    return await this.tagService.searchByName(name);
  }
}
