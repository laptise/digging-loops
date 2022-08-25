import { Test, TestingModule } from '@nestjs/testing';
import { FileMapService } from './file-map.service';

describe('FileMapService', () => {
  let service: FileMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileMapService],
    }).compile();

    service = module.get<FileMapService>(FileMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
