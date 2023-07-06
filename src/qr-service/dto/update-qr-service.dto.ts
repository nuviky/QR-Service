import { PartialType } from '@nestjs/mapped-types';
import { CreateQrServiceDto } from './create-qr-service.dto';

export class UpdateQrServiceDto extends PartialType(CreateQrServiceDto) {}
