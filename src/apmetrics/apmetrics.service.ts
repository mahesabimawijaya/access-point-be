import { Injectable } from '@nestjs/common';
import { CreateApmetricDto } from './dto/create-apmetric.dto';
import { UpdateApmetricDto } from './dto/update-apmetric.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Apmetric } from './entities/apmetric.entity';
import { Repository } from 'typeorm';
import { response } from 'src/utils/response.util';
import { handleException } from 'src/utils/exception.util';

@Injectable()
export class ApmetricsService {
  constructor(
    @InjectRepository(Apmetric)
    private apmetricRepository: Repository<Apmetric>,
  ) {}

  create(createApmetricDto: CreateApmetricDto) {
    return 'This action adds a new apmetric';
  }

  async findAll() {
    try {
      const apmetrics = await this.apmetricRepository.find();

      return response('Access point metrics fetched', apmetrics, 200);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} apmetric`;
  }

  update(id: number, updateApmetricDto: UpdateApmetricDto) {
    return `This action updates a #${id} apmetric`;
  }

  remove(id: number) {
    return `This action removes a #${id} apmetric`;
  }
}
