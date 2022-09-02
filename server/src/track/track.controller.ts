import { User } from '@entities';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
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
  @UseInterceptors(FileInterceptor('track'))
  async upload(
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: NewTrackInput,
  ) {
    console.log(data);
    const fileMap = await this.s3Service.upload(
      user.email,
      data.trackName,
      file,
    );
    await this.trackService.addNew(user, data, fileMap);
    // const url = await this.s3Service.upload(filePath, type);
    return 'a';
  }
}
