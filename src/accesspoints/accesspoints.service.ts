import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accesspoint } from './entities/accesspoint.entity';
import { handleException } from 'src/utils/exception.util';
import { response } from 'src/utils/response.util';
import { Apmetric } from 'src/apmetrics/entities/apmetric.entity';
import { FirmwaresService } from 'src/firmwares/firmwares.service';

@Injectable()
export class AccesspointsService {
  constructor(
    @InjectRepository(Accesspoint)
    private accesspointRepository: Repository<Accesspoint>,
    @InjectRepository(Apmetric)
    private apmetricRepository: Repository<Apmetric>,
    private readonly firmwaresService: FirmwaresService,
  ) {}

  async findAll(sort: string) {
    try {
      const accessPoints = await this.accesspointRepository.find({
        relations: ['sessions', 'firmware'],
        ...(sort && { order: { temperature: sort as 'ASC' | 'DESC' } }),
      });

      return response('Access points fetched', accessPoints, 200);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  async countAll() {
    try {
      const [, total] = await this.accesspointRepository.findAndCount();
      const [, totalActive] = await this.accesspointRepository.findAndCount({
        where: {
          status: 'online',
        },
      });
      const [, totalInactive] = await this.accesspointRepository.findAndCount({
        where: {
          status: 'offline',
        },
      });

      const res = {
        total: total,
        online: totalActive,
        offline: totalInactive,
      };

      return response('Access points fetched', res, 200);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  async getAccesspointBandwidthUsage() {
    try {
      const apmetrics = await this.apmetricRepository
        .createQueryBuilder('apmetric')
        .innerJoinAndSelect('apmetric.accesspoint', 'accesspoint')
        .select([
          'accesspoint.name AS accesspointName',
          'apmetric.bandwithUsage AS bandwidthUsage',
          'apmetric.timeStamp AS timeStamp',
        ])
        .orderBy('apmetric.timeStamp', 'ASC')
        .getRawMany();

      // Group data by hourly timestamp
      const groupedData: { [key: string]: any } = {};

      apmetrics.forEach((metric) => {
        const date = new Date(metric.timestamp);

        // Normalize to hourly timestamp: YYYY-MM-DD HH:00:00
        const time = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')} ${String(date.getUTCHours()).padStart(2, '0')}:00:00`;

        if (!groupedData[time]) {
          groupedData[time] = { time };
        }

        // Sum bandwidth usage for each access point within the hour
        if (!groupedData[time][metric.accesspointname]) {
          groupedData[time][metric.accesspointname] = 0;
        }
        groupedData[time][metric.accesspointname] += parseFloat(
          metric.bandwidthusage,
        );
      });

      return response(
        'Access point metrics grouped hourly',
        Object.values(groupedData),
        200,
      );
    } catch (error) {
      handleException(error, error.message);
    }
  }

  async getAccesspointSignalStrength() {
    try {
      const apmetrics = await this.apmetricRepository
        .createQueryBuilder('apmetric')
        .innerJoinAndSelect('apmetric.accesspoint', 'accesspoint')
        .select([
          'accesspoint.name AS accesspointName',
          'apmetric.signalStrength AS signalStrength',
          'apmetric.timeStamp AS timeStamp',
        ])
        .orderBy('apmetric.timeStamp', 'ASC')
        .getRawMany();

      // Group data by hourly timestamp
      const groupedData: { [key: string]: any } = {};

      apmetrics.forEach((metric) => {
        const date = new Date(metric.timestamp);

        // Normalize to hourly timestamp: YYYY-MM-DD HH:00:00
        const time = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')} ${String(date.getUTCHours()).padStart(2, '0')}:00:00`;

        if (!groupedData[time]) {
          groupedData[time] = { time };
        }

        // Sum bandwidth usage for each access point within the hour
        if (!groupedData[time][metric.accesspointname]) {
          groupedData[time][metric.accesspointname] = 0;
        }
        groupedData[time][metric.accesspointname] += parseFloat(
          metric.signalstrength,
        );
      });

      return response(
        'Access point metrics grouped hourly',
        Object.values(groupedData),
        200,
      );
    } catch (error) {
      handleException(error, error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} accesspoint`;
  }

  async update(id: string) {
    try {
      const accesspoint = await this.accesspointRepository.findOne({
        where: {
          id,
        },
      });

      const latestVersion =
        await this.firmwaresService.getLatestFirmwareByVersion();

      accesspoint.firmware = latestVersion.data;
      const updatedAccessPoint =
        await this.accesspointRepository.save(accesspoint);

      return response('Access point updated', updatedAccessPoint, 200);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  async updateAll() {
    try {
      const accessPoints = await this.accesspointRepository.find();
      const latestVersion =
        await this.firmwaresService.getLatestFirmwareByVersion();

      // ✅ Update all access points with the latest firmware
      const updatedAccessPoints = await Promise.all(
        accessPoints.map(async (ap) => {
          ap.firmware = latestVersion.data;
          return this.accesspointRepository.save(ap); // ✅ Return the saved AP
        }),
      );

      return response('All access points updated', updatedAccessPoints, 200);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} accesspoint`;
  }
}
