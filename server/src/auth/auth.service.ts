import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}
  public async signUp(email: string, pw: string, name: string) {
    const isRegistered = await this.repo
      .findOne({ where: { email: email } })
      .then((x) => x !== null);
    if (isRegistered) throw new HttpException('SU001', HttpStatus.BAD_REQUEST);
    return await this.repo.create({ email: email, password: pw, name }).save();
  }
  public login() {
    return 'hey';
  }
}
