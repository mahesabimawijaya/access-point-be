import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApmetricsService } from './apmetrics.service';
import { CreateApmetricDto } from './dto/create-apmetric.dto';
import { UpdateApmetricDto } from './dto/update-apmetric.dto';

@Controller('apmetrics')
export class ApmetricsController {
  constructor(private readonly apmetricsService: ApmetricsService) {}

  @Post()
  create(@Body() createApmetricDto: CreateApmetricDto) {
    return this.apmetricsService.create(createApmetricDto);
  }

  @Get()
  findAll() {
    return this.apmetricsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apmetricsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApmetricDto: UpdateApmetricDto,
  ) {
    return this.apmetricsService.update(+id, updateApmetricDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apmetricsService.remove(+id);
  }
}
