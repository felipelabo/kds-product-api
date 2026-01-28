import { Injectable } from "@nestjs/common";
import { Order, OrderState } from "../domain/order.entities";
import { OrderRepository } from "../domain/order.repository";

@Injectable()
export class IMOrderRepository implements OrderRepository {
  private orders: Array<Order> = [];

  //SIMULACION BASE DE DATOS EN MEMORIA

  async getAllOrders(): Promise<Array<Order>> {
    return this.orders;
  }

  async saveOrder(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async getOrdersByState(states: string[]): Promise<Order[]> {
    return this.orders.filter(order => states.includes(order.state));
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orders.find(order => order.id === id) || null;
  }

  async updateOrderState(orderId: string, newState: OrderState): Promise<Order> {
    try{
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        order.state = newState;
        return order;
      } else {
        throw new Error('Order not found');
      }
    }catch(error){
      throw new Error('Order not found');
    }
  }
}