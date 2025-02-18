import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { Log } from 'src/logs/entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device, Session, Log])],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
