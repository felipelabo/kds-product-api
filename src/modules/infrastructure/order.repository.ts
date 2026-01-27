import { Injectable } from "@nestjs/common";
import { Order } from "../domain/order.entities";
import { OrderRepository } from "../domain/order.repository";

@Injectable()
export class IMOrderRepository implements OrderRepository {
  private orders: Array<Order> = [];

  async getAllOrders(): Promise<Array<Order>> {
    return this.orders;
  }

  async saveOrder(order: Order): Promise<void> {
    //SIMULA UNA INSERCIÓN EN BASE DE DATOS
    this.orders.push(order);
  }
}