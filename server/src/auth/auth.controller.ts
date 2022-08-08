import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Request as NestRequest,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user';
type PasswordOmitUser = Omit<User, 'password'>;
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Req() { body }: Request): Promise<void> {
    console.log(body);
    const res = await this.authService.signUp(
      body.email,
      body.password,
      body.name,
    );
    if (res) return;
    else throw new HttpException('Signup failed', HttpStatus.BAD_REQUEST);
  }

  @UseGuards(AuthGuard('local')) // passport-local戦略を付与する
  @Post('login')
  async login(@NestRequest() req: { user: PasswordOmitUser }) {
    const user = req.user;
    const token = await this.authService.login(req.user);
    // LocalStrategy.validate()で認証して返した値がreq.userに入ってる
    // JwtToken を返す
    return { ...user, ...token };
  }
}
