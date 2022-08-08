import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

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
}
