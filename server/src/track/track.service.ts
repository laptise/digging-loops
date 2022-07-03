import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private repo: Repository<Track>,
  ) {}
}
