import { Controller } from '@nestjs/common';
import { CommonService } from '@/common/common.service';

@Controller('/common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}
}
