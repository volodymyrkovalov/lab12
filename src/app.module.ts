import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MvcService } from './mvc.service';
import { SortingService } from './sorting.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MvcService, SortingService],
})
export class AppModule {}
