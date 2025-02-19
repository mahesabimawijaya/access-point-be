import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { response } from 'src/utils/response.util';
import { handleException } from 'src/utils/exception.util';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  create(createDeviceDto: CreateDeviceDto) {
    return 'This action adds a new device';
  }

  async findAll() {
    try {
      const devices = await this.deviceRepository.find({
        relations: ['logs', 'sessions', 'sessions.accesspoint'],
      });

      return response('Devices fetched', devices, 200);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  async getDeviceChartData() {
    try {
      const deviceCounts = await this.deviceRepository
        .createQueryBuilder('device')
        .select('device.deviceType', 'device')
        .addSelect('COUNT(device.id)', 'quantity')
        .groupBy('device.deviceType')
        .getRawMany();

      // Define colors for each device type
      const colorMap: { [key: string]: string } = {
        smartphone: 'var(--color-smartphone)',
        desktop: 'var(--color-desktop)',
        laptop: 'var(--color-laptop)',
      };

      // ✅ Ensure quantity is a number & add fill color
      const formattedData = deviceCounts.map((item) => ({
        ...item,
        quantity: Number(item.quantity), // Ensure quantity is a number
        fill: colorMap[item.device] || 'var(--color-default)', // Default color if device type is unknown
      }));

      return response('Device data for chart', formattedData, 200);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
