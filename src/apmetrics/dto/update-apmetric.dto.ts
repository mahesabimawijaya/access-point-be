import { PartialType } from '@nestjs/mapped-types';
import { CreateApmetricDto } from './create-apmetric.dto';

export class UpdateApmetricDto extends PartialType(CreateApmetricDto) {}
