import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './model/users.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserData } from '@/common/interface/user';

@Injectable()
export class UsersService {
  constructor(private users: User) {}

  async getById(id: number): Promise<UserData> {
    const [user] = await this.users.getById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${user.id} was not Found`);
    }

    return user;
  }

  async getByEmail(email: string) {
    return this.users.getByEmail(email);
  }

  async getByRefreshToken(refreshToken: string) {
    return this.users.getByRefreshToken(refreshToken);
  }

  public async createUser(userBody: CreateUserDTO) {
    const [patientId] = await this.users.create(userBody);

    const [createdPatient] = await this.users.getById(patientId);

    return createdPatient;
  }

  public async updateUser(userId: number, patientBody: UpdateUserDTO) {
    const updatedUserId = await this.users.updateById(userId, patientBody);

    const [updatedUser] = await this.users.getById(updatedUserId);

    return updatedUser;
  }

  public async deleteUser(userId: number) {
    const [user] = await this.users.getById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} was not Found`);
    }

    return await this.users.deleteById(userId);
  }
}
