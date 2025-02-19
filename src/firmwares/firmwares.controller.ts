import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FirmwaresService } from './firmwares.service';
import { CreateFirmwareDto } from './dto/create-firmware.dto';
import { UpdateFirmwareDto } from './dto/update-firmware.dto';

@Controller('firmwares')
export class FirmwaresController {
  constructor(private readonly firmwaresService: FirmwaresService) {}

  @Post()
  create(@Body() createFirmwareDto: CreateFirmwareDto) {
    return this.firmwaresService.create(createFirmwareDto);
  }

  @Get()
  findAll() {
    return this.firmwaresService.findAll();
  }

  @Get('latest')
  findLatest() {
    return this.firmwaresService.getLatestFirmwareByVersion();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.firmwaresService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFirmwareDto: UpdateFirmwareDto,
  ) {
    return this.firmwaresService.update(+id, updateFirmwareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.firmwaresService.remove(+id);
  }
}
