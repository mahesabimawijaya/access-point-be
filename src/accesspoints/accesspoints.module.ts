import { Module } from '@nestjs/common';
import { AccesspointsService } from './accesspoints.service';
import { AccesspointsController } from './accesspoints.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accesspoint } from './entities/accesspoint.entity';
import { Firmware } from 'src/firmwares/entities/firmware.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { Apmetric } from 'src/apmetrics/entities/apmetric.entity';
import { Log } from 'src/logs/entities/log.entity';
import { FirmwaresModule } from 'src/firmwares/firmwares.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accesspoint, Firmware, Session, Apmetric, Log]),
    FirmwaresModule,
  ],
  controllers: [AccesspointsController],
  providers: [AccesspointsService],
})
export class AccesspointsModule {}
