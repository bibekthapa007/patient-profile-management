import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';

import { UserData } from '@/common/interface/user';
import { UsersService } from '@/modules/users/users.service';
import { UserLoginDTO } from '@/modules/users/dto/user-login.dto';
import { CreateUserDTO } from '@/modules/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  private logger: Logger;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger('AuthService');
  }

  private async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          userId,
          email,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '100m',
        },
      ),

      this.jwtService.signAsync(
        {
          sub: userId,
          userId,
          email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '1d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.usersService.updateUser(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async localSignUp(userBody: CreateUserDTO) {
    this.logger.log(`User sign up with email: ${userBody.email}`);

    const [userExists] = await this.usersService.getByEmail(userBody.email);

    if (userExists) {
      throw new ConflictException(`User with email ${userBody.email} exists.`);
    }

    if (!userBody.name) {
      userBody.name = userBody.email.split('@')[0];
    }

    const hash = await this.hashData(userBody.password);

    const newUser = await this.usersService.createUser({
      ...userBody,
      password: hash,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return { ...tokens, user: userExists };
  }

  async localSignIn(userBody: UserLoginDTO) {
    this.logger.log(`User sign up with email: ${userBody.email}`);

    const [user] = await this.usersService.getByEmail(userBody.email);

    if (!user) {
      throw new ConflictException(
        `User with email ${userBody.email} does not exist.`,
      );
    }

    if (!argon2.verify(user.password, userBody.password)) {
      throw new HttpException(
        'User email or password does not match.',
        HttpStatus.BAD_GATEWAY,
      );
    }

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    this.logger.log(`User id ${user.id} login sucessfully.`);

    return { ...tokens, user };
  }

  async refreshTokens(user: UserData) {
    this.logger.log(`Update refresh token for user id: ${user.id}`);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(id: number) {
    this.logger.log(`Logout user by id: ${id}`);

    await this.usersService.updateUser(id, { refreshToken: null });

    return { message: 'Logout Successfully.' };
  }
}
