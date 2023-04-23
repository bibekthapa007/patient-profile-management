import { Injectable, NotFoundException, Logger } from '@nestjs/common';

import { UserData } from '@/common/interface/user';

import { User } from './model/users.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private logger: Logger;

  constructor(private users: User) {
    this.logger = new Logger('UsersService');
  }

  async getById(id: number): Promise<UserData> {
    this.logger.log(`Get user by id: ${id}`);

    const [user] = await this.users.getById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${user.id} was not Found`);
    }

    return user;
  }

  async getByEmail(email: string) {
    this.logger.log(`Get user by email: ${email}`);

    return this.users.getByEmail(email);
  }

  async getByRefreshToken(refreshToken: string) {
    this.logger.log(`Get user by refresh token: ${refreshToken}`);

    return this.users.getByRefreshToken(refreshToken);
  }

  public async createUser(userBody: CreateUserDTO) {
    this.logger.log(`Create user`);

    const [patientId] = await this.users.create(userBody);

    const [createdPatient] = await this.users.getById(patientId);

    return createdPatient;
  }

  public async updateUser(userId: number, patientBody: UpdateUserDTO) {
    this.logger.log(`Update user by id: ${userId}`);

    const updatedUserId = await this.users.updateById(userId, patientBody);

    const [updatedUser] = await this.users.getById(updatedUserId);

    return updatedUser;
  }

  public async deleteUser(userId: number) {
    this.logger.log(`Delete user by id: ${userId}`);

    const [user] = await this.users.getById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} was not Found`);
    }

    return await this.users.deleteById(userId);
  }
}
