import { User } from '@entities';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Request,
  Res,
  Req,
  StreamableFile,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { createReadStream, WriteStream } from 'fs';
import { join } from 'path';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { FileCategory } from 'src/constants';
import { EventsGateway } from 'src/events/events.gateway';
import { S3Service } from 'src/s3/s3.service';
import { NewTrackInput } from './dto/index.input';
import { TrackService } from './track.service';
import type { Response } from 'express';
import { GetObjectRequest } from 'aws-sdk/clients/s3';

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
  @Get('stream/:fileType/:fileMapId/:fileName')
  async sampleStream(
    @Res() response: Response,
    @Req() requset: Request,
    @Param('fileType') fileType: string,
    @Param('fileMapId') fileMapId: string,
    @Param('fileName') fileName: string,
  ) {
    const Bucket = 'digging-loops';
    const Key = `${fileType}/${fileMapId}/${fileName}`;
    const params: GetObjectRequest = { Bucket, Key };
    const stream = this.s3Service.s3.getObject(params).createReadStream();
    stream.pipe(response);
  }
}
