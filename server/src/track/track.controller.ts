import { Body, Controller, Post } from '@nestjs/common';

@Controller('track')
export class TrackController {
  @Post('upload')
  async upload(@Body() createCatDto: object) {
    console.log(createCatDto);
    return 'a';
  }
}
