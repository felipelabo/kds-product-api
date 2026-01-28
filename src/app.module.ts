import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './modules/order/order.module';
import { RiderModule } from './modules/rider/rider.module';

@Module({
  imports: [OrdersModule, RiderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
