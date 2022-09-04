/* eslint-disable @typescript-eslint/no-unused-vars */
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FileCategory } from 'src/constants';
import { FileMap } from 'src/file-map/file-map';
import { FileMapService } from 'src/file-map/file-map.service';
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
}
