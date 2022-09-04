import { User, FileMap } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewTrackInput } from './dto/index.input';
import { Track } from './track';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private repo: Repository<Track>,
  ) {}
  public async addNew(
    { email: ownerId }: User,
    { keyChord, title }: NewTrackInput,
    trackFileMap: FileMap,
    thumbnailFileMap: FileMap,
  ) {
    const newEntity = this.repo.create({
      title: title,
      fileMapId: trackFileMap.id,
      isDisabled: false,
      purchasedCount: 0,
      playedCount: 0,
      keyChord: keyChord,
      thumbnailFileMapId: thumbnailFileMap.id,
      ownerId,
    });
    await this.repo.save(newEntity);
  }
  public async getUserUploadedTracks(ownerId: string) {
    return await this.repo.find({ where: { ownerId: ownerId } });
  }
}
