// src/orders/infrastructure/external-orders.mock.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EventBus } from '../../../shared/eventbus';
import { Rider } from '../domain/rider.entities';
import { OrderRepository } from 'src/modules/order/domain/order.repository';
import { RiderRepository } from '../domain/rider.repository';

@Injectable()
export class ExternalOrdersMock implements OnModuleInit {
  private interval?: NodeJS.Timeout;
  

  constructor(
    private readonly eventBus: EventBus,
    private readonly orderRepository: OrderRepository,
    private readonly riderRepository: RiderRepository
  ) {}

  onModuleInit() {
    this.start();
  }

  private start() {
    this.interval = setInterval(async() => {
      const ordersActive = await this.orderRepository.getOrdersByState(['PENDING', 'IN_PROGRESS','READY']);
      const riders = await this.riderRepository.getAllRiders();

      // Filtra órdenes que NO tienen rider asignado
      const assignedOrderIds = new Set(riders.map(rider => rider.orderWanted));
      const unassignedOrders = ordersActive.filter(order => !assignedOrderIds.has(order.id));
      
      if (unassignedOrders.length === 0 && this.interval) {
        clearInterval(this.interval);
      }

      unassignedOrders.forEach(order => {
        const rider = this.createPickupRider(order.id);
        // 👉 SIMULA mensaje entrante (MQ / webhook)
        this.eventBus.emit('external.rider.received', rider);
      });

    }, 6000);
  }

  private createPickupRider(orderId:string): Rider {
    return new Rider(
      randomUUID(),
      orderId,
      this.getRandomCode()
    );
  }

  private getRandomCode() {
    const length = 4
    let result = ""
    const characters = "0123456789"
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * charactersLength),
      )
    }
    return result
  }

}
