import { PartialType } from '@nestjs/mapped-types';
import { CreateAccesspointDto } from './create-accesspoint.dto';

export class UpdateAccesspointDto extends PartialType(CreateAccesspointDto) {}
