import { PartialType } from '@nestjs/swagger';
import { CreateAuserDto } from './create-auser.dto';

export class UpdateAuserDto extends PartialType(CreateAuserDto) {}
