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
  public async addNewFileMap(
    ownerId: string,
    fileType: number,
    fileName: string,
  ) {
    const fileId = await this.getNewFileId(fileType);
    const entity = this.repo.create({
      id: fileId,
      type: fileType,
      name: fileName,
      ownerId,
    });
    return await this.repo.save(entity);
  }
  public async updateUrl(fileMap: FileMap, url: string) {
    fileMap.url = url;
    await this.repo.save(fileMap);
  }
  private async getNewFileId(fileType: number) {
    const res = await this.repo.manager.query('select get_new_file_id(?) id', [
      fileType,
    ]);
    return res?.[0]?.id;
  }
  public async getUserUploadedMaps(userId: string) {
    return await this.repo.find({ where: { ownerId: userId } });
  }
}
