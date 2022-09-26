import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Tag } from './tag';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private repo: Repository<Tag>,
  ) {}

  async searchByName(name: string) {
    return await this.repo.find({
      where: {
        name: Raw((alias) => `LOWER(${alias}) LIKE :Name`, {
          Name: `${name.toLowerCase()}%`,
        }),
      },
    });
  }

  async getById(id: number) {
    return await this.repo.findOneBy({ id });
  }
}
