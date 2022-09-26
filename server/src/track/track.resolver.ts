/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FileCategory } from 'src/constants';
import { FileMap } from 'src/file-map/file-map';
import { FileMapService } from 'src/file-map/file-map.service';
import { Tag } from 'src/tag/tag';
import { TagService } from 'src/tag/tag.service';
import { TrackTagMapService } from 'src/track-tag-map/track-tag-map.service';
import { TrackSearchInput } from './dto/search.input';
import { Track } from './track';
import { TrackService } from './track.service';

@Resolver((of) => Track)
export class TrackResolver {
  constructor(
    private trackService: TrackService,
    private fileMapService: FileMapService,
    private trackTagMapService: TrackTagMapService,
    private tagService: TagService,
  ) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @ResolveField('file', () => FileMap)
  async getTrackFile(@Parent() track: Track) {
    return await this.fileMapService.getFileMapByKeys(
      track.fileMapId,
      FileCategory.UploadSample,
    );
  }

  @ResolveField('thumbnail', () => FileMap)
  async getTrackThumbnail(@Parent() track: Track) {
    return await this.fileMapService.getFileMapByKeys(
      track.thumbnailFileMapId,
      FileCategory.Thumbnail,
    );
  }

  @ResolveField('tags', () => [Tag])
  async getTags(@Parent() track: Track) {
    const tagMaps = await this.trackTagMapService.getByTrackId(track.id);
    const tags = await Promise.all(
      tagMaps.map((tagMap) => this.tagService.getById(tagMap.tagId)),
    );
    return tags;
  }

  @Query(() => [Track])
  async searchTracks(@Args('condition') condition: TrackSearchInput) {
    const { ownerId, type } = condition;
    return await this.trackService.getByOwnerAndCategories(ownerId, type);
  }

  @Query(() => Track)
  async getTrackById(@Args('id') id: number) {
    return await this.trackService.getById(id);
  }
}
