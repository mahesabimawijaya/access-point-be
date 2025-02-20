import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Accesspoint } from 'src/accesspoints/entities/accesspoint.entity';
import { Device } from 'src/devices/entities/device.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Log, Accesspoint, Device, User])],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
