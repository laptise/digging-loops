/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FileCategory } from 'src/constants';
import { FileMap } from 'src/file-map/file-map';
import { FileMapService } from 'src/file-map/file-map.service';
import { TrackSearchInput } from './dto/search.input';
import { Track } from './track';
import { TrackService } from './track.service';

@Resolver((of) => Track)
export class TrackResolver {
  constructor(
    private trackService: TrackService,
    private fileMapService: FileMapService,
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
