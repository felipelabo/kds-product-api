// src/orders/orders.module.ts

import { Module, forwardRef } from '@nestjs/common';

// Controllers
import { OrderController } from './infrastructure/order.controller';

// Use cases (services)
import { OrderService } from './application/order.services';

// Repository (infra)
import { IMOrderRepository } from './infrastructure/order.repository';

// Domain
import { OrderRepository } from './domain/order.repository';

//External
import { ExternalOrderListener } from './application/external.listener';
import { ExternalOrdersMock } from './infrastructure/external.mock';

// Shared
import { EventBus } from '../../shared/eventbus';
import { InMemoryEventBus } from '../../shared/imeventbus';

import { RiderModule } from '../rider/rider.module';

@Module({
  imports: [
		forwardRef(() => RiderModule),
	],
  controllers: [OrderController],
  providers: [
    OrderService,
    IMOrderRepository,
    ExternalOrderListener,
    ExternalOrdersMock,

    // Repository binding (interface → implementation)
    {
      provide: OrderRepository,
      useClass: IMOrderRepository,
    },

    // EventBus binding
    {
      provide: EventBus,
      useClass: InMemoryEventBus,
    },
  ],
  exports: [
    OrderRepository,
  ],
})
export class OrdersModule {}
