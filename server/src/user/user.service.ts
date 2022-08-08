import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  public async getByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }
  public async addUser(email: string, pw: string, name: string) {
    return await this.repo.create({ email: email, password: pw, name }).save();
  }
  public async findWithEmailAndPassword(email: string, password: string) {
    return await this.repo.findOne({ where: { email, password } });
  }
}
