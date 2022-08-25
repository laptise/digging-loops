import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileMap } from './file-map';

@Injectable()
export class FileMapService {
  constructor(
    @InjectRepository(FileMap)
    private repo: Repository<FileMap>,
  ) {}
  public async getNewFileId(fileType: number) {
    const [res] = await this.repo.manager.query(
      'select get_new_file_id(?) id',
      [fileType],
    );
    console.log(res.id);
  }
}
