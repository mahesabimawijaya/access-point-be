import { Module } from '@nestjs/common';
import { FirmwaresService } from './firmwares.service';
import { FirmwaresController } from './firmwares.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Firmware } from './entities/firmware.entity';
import { Accesspoint } from 'src/accesspoints/entities/accesspoint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Firmware, Accesspoint])],
  controllers: [FirmwaresController],
  providers: [FirmwaresService],
  exports: [FirmwaresService],
})
export class FirmwaresModule {}
