import { Module } from '@nestjs/common';
import { User } from './model/users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, User],
  exports: [UsersService, User]
})
export class UsersModule {}
