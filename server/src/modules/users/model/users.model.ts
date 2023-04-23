import BaseModel from '@/models/BaseModel';
import { USERS } from '@/common/dbTables';

import { UserData } from '@/common/interface/user';

import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';

export class User extends BaseModel {
  private readonly TABLENAME = USERS;

  table() {
    return this.query.table(this.TABLENAME);
  }

  create(userBody: CreateUserDTO) {
    return this.table().insert(userBody);
  }

  getList() {
    return this.table().select('*');
  }

  getById(id: number): Promise<UserData[]> {
    return this.table().where({ id });
  }

  async getByEmail(email: string) {
    return this.table().where({ email });
  }

  async getByRefreshToken(refreshToken: string) {
    return this.table().where({ refreshToken });
  }

  updateById(id: number, userBody: UpdateUserDTO) {
    return this.table().update(userBody).where({ id });
  }

  deleteById(id: number) {
    return this.table().delete().where({ id });
  }
}
