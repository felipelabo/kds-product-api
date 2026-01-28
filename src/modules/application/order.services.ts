import { Injectable, Inject } from "@nestjs/common";
import { Order } from "../domain/order.entities";
import { OrderRepository } from "../domain/order.repository";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.getAllOrders();
  }

  async saveOrder(order: Order): Promise<void> {
    if (!order.id || !order.name) {
      throw new Error('Order must have id and customer');
    }
    return this.orderRepository.saveOrder(order);
  }

  async getActiveOrders(): Promise<Order[]> {
    return this.orderRepository.getOrdersByState(['PENDING', 'IN_PROGRESS','READY']);
  }

  async moveToInProgress(orderId: string): Promise<Order> {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) throw new Error('Order not found');
    if (order.state !== 'PENDING') throw new Error('Only PENDING orders can be moved to IN_PROGRESS');
    return this.orderRepository.updateOrderState(orderId, 'IN_PROGRESS');
  }

  async moveToReady(orderId: string): Promise<Order> {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) throw new Error('Order not found');
    if (order.state !== 'IN_PROGRESS') throw new Error('Only IN_PROGRESS orders can be moved to READY');
    return this.orderRepository.updateOrderState(orderId, 'READY');
  }

  async moveToDelivered(orderId: string): Promise<Order> {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) throw new Error('Order not found');
    if (order.state !== 'READY') throw new Error('Only READY orders can be moved to DELIVERED');
    return this.orderRepository.updateOrderState(orderId, 'DELIVERED');
  }

}
