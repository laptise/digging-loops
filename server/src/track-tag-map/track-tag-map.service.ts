import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackTagMap } from './track-tag-map';

@Injectable()
export class TrackTagMapService {
  constructor(
    @InjectRepository(TrackTagMap)
    private repo: Repository<TrackTagMap>,
  ) {}

  async getByTrackId(trackId: number) {
    return await this.repo.find({ where: { trackId } });
  }
}
