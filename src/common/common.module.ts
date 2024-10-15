import { Module } from '@nestjs/common';
import { TaskService } from '@/common/task.service';
import { DefaultLogger } from '@/common/logger/default-logger';
import { CommonService } from '@/common/common.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CommonService, TaskService, DefaultLogger],
  exports: [CommonService],
})
export class CommonModule {}
