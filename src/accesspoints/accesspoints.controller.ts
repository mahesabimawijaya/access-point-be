import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccesspointsService } from './accesspoints.service';
import { CreateAccesspointDto } from './dto/create-accesspoint.dto';
import { UpdateAccesspointDto } from './dto/update-accesspoint.dto';

@Controller('accesspoints')
export class AccesspointsController {
  constructor(private readonly accesspointsService: AccesspointsService) {}

  @Post()
  create(@Body() createAccesspointDto: CreateAccesspointDto) {
    return this.accesspointsService.create(createAccesspointDto);
  }

  @Get()
  findAll() {
    return this.accesspointsService.findAll();
  }

  @Get('/count')
  countAll() {
    return this.accesspointsService.countAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accesspointsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccesspointDto: UpdateAccesspointDto,
  ) {
    return this.accesspointsService.update(+id, updateAccesspointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accesspointsService.remove(+id);
  }
}
