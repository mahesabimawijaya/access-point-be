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

  async findAll() {
    try {
      const firmwares = await this.firmwareRepository.find();

      return response('Firmwares fetched', firmwares, 200);
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
