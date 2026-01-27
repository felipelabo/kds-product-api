// src/orders/application/external-order.listener.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBus } from '../../shared/eventbus';
import { OrderService } from './order.services';
import { Order } from '../domain/order.entities';

@Injectable()
export class ExternalOrderListener implements OnModuleInit {
  constructor(
    private readonly eventBus: EventBus,
    private readonly OrderService: OrderService
  ) {}

  onModuleInit() {
    this.eventBus.on('external.order.received', (order: Order) => {
      this.OrderService.saveOrder(order);
    });
  }
}
