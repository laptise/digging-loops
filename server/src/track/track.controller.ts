import { Body, Controller, Param, Post } from '@nestjs/common';
import { S3Service } from 'src/s3/s3.service';

@Controller('track')
export class TrackController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  async upload(@Param('id') id: string, @Body() body: any) {
    console.log(id, body);
    console.log(id, body.data);
    const filePath = `profile-images/${id}/profile.png`;
    // const url = await this.s3Service.upload(filePath, type);
    return 'a';
  }
}
