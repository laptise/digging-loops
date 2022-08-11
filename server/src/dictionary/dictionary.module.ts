import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from './dictionary';

@Module({ imports: [TypeOrmModule.forFeature([Dictionary])] })
export class DictionaryModule {}
