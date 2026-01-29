// src/orders/application/external-order.listener.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBus } from '../../../shared/eventbus';
import { Rider } from '../domain/rider.entities';
import { RiderRepository } from '../domain/rider.repository';

@Injectable()
export class ExternalOrderListener implements OnModuleInit {
  constructor(
    private readonly eventBus: EventBus,
    private readonly riderRepository: RiderRepository
  ) {}

  onModuleInit() {
    this.eventBus.on('external.rider.received', (rider: Rider) => {
      this.riderRepository.saveRider(rider);
    });
  }
}
