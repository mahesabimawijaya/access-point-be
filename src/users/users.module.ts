import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Log } from 'src/logs/entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Notification, Log])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
