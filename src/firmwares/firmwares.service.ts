import { Injectable } from '@nestjs/common';
import { CreateFirmwareDto } from './dto/create-firmware.dto';
import { UpdateFirmwareDto } from './dto/update-firmware.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Firmware } from './entities/firmware.entity';
import { Repository } from 'typeorm';
import { response } from 'src/utils/response.util';
import { handleException } from 'src/utils/exception.util';

@Injectable()
export class FirmwaresService {
  constructor(
    @InjectRepository(Firmware)
    private firmwareRepository: Repository<Firmware>,
  ) {}

  create(createFirmwareDto: CreateFirmwareDto) {
    return 'This action adds a new firmware';
  }

  async findAll(sort: string) {
    try {
      const firmwares = await this.firmwareRepository.find({
        relations: ['accesspoints'],
        ...(sort && { order: { version: sort as 'ASC' | 'DESC' } }),
      });

      return response('Firmwares fetched', firmwares, 200);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  async getLatestFirmwareByVersion() {
    try {
      const latestFirmware = await this.firmwareRepository
        .createQueryBuilder('firmware')
        .select([
          'firmware.id',
          'firmware.version',
          'firmware.description',
          'firmware.createdAt',
          'firmware.updatedAt',
        ])
        .where('firmware.deletedAt IS NULL') // Ensure active firmwares only
        .orderBy(`STRING_TO_ARRAY(firmware.version, '.')::int[]`, 'DESC') // Sort by version parts correctly
        .limit(1)
        .getOne();

      if (!latestFirmware) {
        return response('No firmware found', null, 404);
      }

      return response('Latest firmware fetched', latestFirmware, 200);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} firmware`;
  }

  update(id: number, updateFirmwareDto: UpdateFirmwareDto) {
    return `This action updates a #${id} firmware`;
  }

  remove(id: number) {
    return `This action removes a #${id} firmware`;
  }
}
