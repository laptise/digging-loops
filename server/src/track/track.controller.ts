import { User } from '@entities';
import { UploadedFiles } from '@nestjs/common';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { FileCategory } from 'src/constants';
import { S3Service } from 'src/s3/s3.service';
import { NewTrackInput } from './dto/index.input';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly trackService: TrackService,
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
    );
    const thumbnailFileMap = await this.s3Service.upload(
      user.email,
      data.thumbnailName,
      thumbnail[0],
      FileCategory.Thumbnail,
    );
    await this.trackService.addNew(user, data, trackFileMap, thumbnailFileMap);
    console.log(thumbnailFileMap);
    // const url = await this.s3Service.upload(filePath, type);
    return 'a';
  }
}
