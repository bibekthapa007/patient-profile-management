import BaseModel from '@/models/BaseModel';
import { USERS } from '@/common/dbTables';

import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UserData } from '@/common/interface/user';

export class User extends BaseModel {
  private readonly TABLENAME = USERS;

  table() {
    return this.query.table(this.TABLENAME);
  }

  create(patientBody: CreateUserDTO) {
    return this.table().insert(patientBody);
  }

  getList() {
    return this.table().select('*');
  }

  getById(id: Number): Promise<UserData[]> {
    return this.table().where({ id });
  }

  async getByEmail(email: string) {
    return this.table().where({ email });
  }

  async getByRefreshToken(refreshToken: string) {
    return this.table().where({ refreshToken });
  }

  updateById(id: Number, patientBody: UpdateUserDTO) {
    return this.table().update(patientBody).where({ id });
  }

  deleteById(id: Number) {
    return this.table().delete().where({ id });
  }
}
