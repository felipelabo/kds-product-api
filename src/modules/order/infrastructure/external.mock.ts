// src/orders/infrastructure/external-orders.mock.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EventBus } from '../../../shared/eventbus';
import { Order } from '../domain/order.entities';

@Injectable()
export class ExternalOrdersMock implements OnModuleInit {
  private interval?: NodeJS.Timeout;
  private maxOrders = this.getRandomInterval(5, 15);

  constructor(private readonly eventBus: EventBus) {}

  onModuleInit() {
    this.start();
  }

  private start() {
    this.interval = setInterval(() => {
      const order = this.createRandomOrder();

      // 👉 SIMULA mensaje entrante (MQ / webhook)
      this.eventBus.emit('external.order.received', order);

      this.maxOrders--;

      if (this.maxOrders <= 0 && this.interval) {
        clearInterval(this.interval);
      }
    }, 5000);
  }

  private createRandomOrder(): Order {
    return new Order(
      this.getRandomId(),
      'PENDING',
      [
        {
            id: randomUUID(),
            name: "Hamburguesa",
            image: "https://example.com/burger.png",
            price: {
                currency: "USD",
                amount: 5.99,
            },
            quantity: 2,
        },
        {
            id: randomUUID(),
            name: "Papas Fritas",
            image: "https://example.com/fries.png",
            price: {
                currency: "USD",
                amount: 2.99,
            },
            note: "Sin sal",
            quantity: 1,
        },
      ],
      'glovo',
      new Date()
    );
  }

  private getRandomInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomId() {
    const length = 5
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
