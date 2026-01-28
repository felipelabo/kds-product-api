// src/orders/application/external-order.listener.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBus } from '../../../shared/eventbus';
import { RiderService } from './rider.services';
import { Rider } from '../domain/rider.entities';

@Injectable()
export class ExternalOrderListener implements OnModuleInit {
  constructor(
    private readonly eventBus: EventBus,
    private readonly RiderService: RiderService
  ) {}

  onModuleInit() {
    this.eventBus.on('external.rider.received', (rider: Rider) => {
      console.log('Nuevo rider recibido desde sistema externo:', rider);  
      this.RiderService.saveRider(rider);
    });
  }
}
