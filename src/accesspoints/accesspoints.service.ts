import { Injectable } from '@nestjs/common';
import { CreateAccesspointDto } from './dto/create-accesspoint.dto';
import { UpdateAccesspointDto } from './dto/update-accesspoint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accesspoint } from './entities/accesspoint.entity';
import { handleException } from 'src/utils/exception.util';
import { response } from 'src/utils/response.util';

@Injectable()
export class AccesspointsService {
  constructor(
    @InjectRepository(Accesspoint)
    private accesspointRepository: Repository<Accesspoint>,
  ) {}

  create(createAccesspointDto: CreateAccesspointDto) {
    return 'This action adds a new accesspoint';
  }

  async findAll() {
    try {
      const accessPoints = await this.accesspointRepository.find();

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

  findOne(id: number) {
    return `This action returns a #${id} accesspoint`;
  }

  update(id: number, updateAccesspointDto: UpdateAccesspointDto) {
    return `This action updates a #${id} accesspoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} accesspoint`;
  }
}
