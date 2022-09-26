import { Test, TestingModule } from '@nestjs/testing';
import { TrackTagMapService } from './track-tag-map.service';

describe('TrackTagMapService', () => {
  let service: TrackTagMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackTagMapService],
    }).compile();

    service = module.get<TrackTagMapService>(TrackTagMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
