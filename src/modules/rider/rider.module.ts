// src/rider/rider.module.ts

import { Module } from '@nestjs/common';
import { OrdersModule } from '../order/order.module';

// Controllers
import { RiderController } from './infrastructure/rider.controller';

// Use cases (services)
import { RiderService } from './application/rider.services';

// Repository (infra)
import { IMRiderRepository } from './infrastructure/rider.repository';

// Domain
import { RiderRepository } from './domain/rider.repository';

// External
import { ExternalOrderListener } from './application/external.listener';
import { ExternalOrdersMock } from './infrastructure/external.mock';

// Shared Event Bus
import { EventBus } from '../../shared/eventbus';
import { InMemoryEventBus } from '../../shared/imeventbus';

@Module({
	imports: [
		// Importa OrdersModule para disponer de OrderService exportado
		OrdersModule,
	],
	controllers: [RiderController],
	providers: [
		// Use cases
		RiderService,

		// Infra implementations
		IMRiderRepository,
		ExternalOrderListener,
		ExternalOrdersMock,

		// Repository binding (abstract → implementation)
		{
			provide: RiderRepository,
			useClass: IMRiderRepository,
		},

		// EventBus binding
		{
			provide: EventBus,
			useClass: InMemoryEventBus,
		},
	],
})
export class RiderModule {}
