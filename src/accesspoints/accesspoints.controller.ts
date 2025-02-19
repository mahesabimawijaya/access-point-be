import { Controller, Get, Patch, Param, Delete } from '@nestjs/common';
import { AccesspointsService } from './accesspoints.service';

@Controller('accesspoints')
export class AccesspointsController {
  constructor(private readonly accesspointsService: AccesspointsService) {}

  @Get()
  findAll() {
    return this.accesspointsService.findAll();
  }

  @Get('/count')
  countAll() {
    return this.accesspointsService.countAll();
  }

  @Get('/apmetrics')
  getBandwith() {
    return this.accesspointsService.getAccesspointBandwidthUsage();
  }

  @Get('/signal')
  getSignal() {
    return this.accesspointsService.getAccesspointSignalStrength();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accesspointsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.accesspointsService.update(id);
  }

  @Patch()
  updateAll() {
    return this.accesspointsService.updateAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accesspointsService.remove(+id);
  }
}
