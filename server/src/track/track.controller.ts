import { User } from '@entities';
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { FileCategory } from 'src/constants';
import { EventsGateway } from 'src/events/events.gateway';
import { S3Service } from 'src/s3/s3.service';
import { NewTrackInput } from './dto/index.input';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly trackService: TrackService,
    private eventsGateway: EventsGateway,
  ) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt')) //
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'track', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
  )
  async upload(
    @CurrentUser() user: User,
    @UploadedFiles()
    {
      track,
      thumbnail,
    }: {
      track: Express.Multer.File[];
      thumbnail: Express.Multer.File[];
    },
    @Body() data: NewTrackInput,
  ) {
    console.log(data);
    const trackFileMap = await this.s3Service.upload(
      user.email,
      data.trackName,
      track[0],
      FileCategory.UploadSample,
      true,
    );
    const thumbnailFileMap = await this.s3Service.upload(
      user.email,
      data.thumbnailName,
      thumbnail[0],
      FileCategory.Thumbnail,
    );
    this.eventsGateway.sendTest(5, 0, 0);
    await this.trackService.addNew(user, data, trackFileMap, thumbnailFileMap);
    console.log(thumbnailFileMap);
    // const url = await this.s3Service.upload(filePath, type);
    return 'a';
  }
}
