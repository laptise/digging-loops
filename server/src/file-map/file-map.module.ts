import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileMap } from './file-map';
import { FileMapService } from './file-map.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileMap])],
  providers: [FileMapService],
  exports: [FileMapService, TypeOrmModule],
})
export class FileMapModule {}
