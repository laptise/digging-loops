import { User } from '@entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  public async signUp(email: string, pw: string, name: string) {
    const isRegistered = await this.userService
      .getByEmail(email)
      .then((x) => x !== null);
    if (isRegistered) throw new HttpException('SU001', HttpStatus.BAD_REQUEST);
    return this.userService.addUser(email, pw, name);
  }

  // jwt tokenを返す
  async login(user: PasswordOmitUser) {
    // jwtにつけるPayload情報
    const payload: User = {
      email: user.email,
      name: user.name,
      rank: user.rank,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        privateKey: process.env.JWT_SECRET_KEY,
      }),
    };
  }

  public async validateUser(email: string, password: string) {
    return await this.userService.findWithEmailAndPassword(email, password);
  }
}
