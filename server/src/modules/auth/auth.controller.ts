import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserLoginDTO } from '../users/dto/user-login.dto';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { AccessTokenGuard } from '@/common/guards/AccessTokenGuard';
import { Request } from 'express';
import { User } from '../users/model/users.model';
import { UserData } from '@/common/interface/user';
import { RefreshTokenGuard } from '@/common/guards/RefreshTokenGuard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  localSignUp(@Body() body: CreateUserDTO) {
    return this.authService.localSignUp(body);
  }

  @Post('/signin')
  localSignIn(@Body() body: UserLoginDTO) {
    return this.authService.localSignIn(body);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  refreshToken(@Req() req: Request) {
    const user = req.user as UserData;
    console.log(user);
    return this.authService.refreshTokens(user);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/logout')
  logout(@Req() req: Request) {
    const user = req.user as UserData;
    return this.authService.logout(user?.id);
  }
}
