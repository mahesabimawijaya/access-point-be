import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Device } from 'src/devices/entities/device.entity';
import { Accesspoint } from 'src/accesspoints/entities/accesspoint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Device, Accesspoint])],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
