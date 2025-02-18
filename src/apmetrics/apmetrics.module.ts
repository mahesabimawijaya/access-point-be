import { Module } from '@nestjs/common';
import { ApmetricsService } from './apmetrics.service';
import { ApmetricsController } from './apmetrics.controller';
import { Apmetric } from './entities/apmetric.entity';
import { Accesspoint } from 'src/accesspoints/entities/accesspoint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Apmetric, Accesspoint])],
  controllers: [ApmetricsController],
  providers: [ApmetricsService],
})
export class ApmetricsModule {}
