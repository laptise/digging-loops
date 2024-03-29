import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagResolver, TagService, TypeOrmModule],
  exports: [TypeOrmModule, TagService],
})
export class TagModule {}
