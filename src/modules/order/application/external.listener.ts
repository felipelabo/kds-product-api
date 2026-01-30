// src/orders/application/external-order.listener.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBus } from '../../../shared/eventbus';
import { Order } from '../domain/order.entities';
import { OrderRepository } from '../domain/order.repository';

@Injectable()
export class ExternalOrderListener implements OnModuleInit {
  constructor(
    private readonly eventBus: EventBus,
    private readonly orderRepository: OrderRepository
  ) {}

  onModuleInit() {
    this.eventBus.on('external.order.received', (order: Order) => {
      this.orderRepository.saveOrder(order);
    });
    this.eventBus.on('external.order.uber.received', (order: Order) => {
      this.orderRepository.saveOrder(order);
    });
  }
}
