// src/orders/infrastructure/external-orders.mock.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EventBus } from '../../../shared/eventbus';
import { Rider } from '../domain/rider.entities';
import { OrderService } from 'src/modules/order/application/order.services';
import { RiderService } from '../application/rider.services';

@Injectable()
export class ExternalOrdersMock implements OnModuleInit {
  private interval?: NodeJS.Timeout;
  

  constructor(
    private readonly eventBus: EventBus,
    private readonly orderService: OrderService,
    private readonly riderService: RiderService
  ) {}

  onModuleInit() {
    this.start();
  }

  private start() {
    this.interval = setInterval(async() => {
      const ordersActive = await this.orderService.getActiveOrders();
      const riders = await this.riderService.getAllRiders();

      // Filtra órdenes que NO tienen rider asignado
      const assignedOrderIds = new Set(riders.map(rider => rider.orderWanted));
      const unassignedOrders = ordersActive.filter(order => !assignedOrderIds.has(order.id));
      
      console.log(`ordenes sin riders encontradas: ${unassignedOrders.length}`);

      if (unassignedOrders.length === 0 && this.interval) {
        console.log('No hay órdenes activas para asignar a un rider.');
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
      orderId
    );
  }

}
