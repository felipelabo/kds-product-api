import { Injectable } from "@nestjs/common";
import { Order } from "../domain/order.entities";
import { OrderRepository } from "../domain/order.repository";
import { RiderRepository } from "src/modules/rider/domain/rider.repository";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly riderRepository: RiderRepository
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
    //Verificar que la orden exista y esté en estado READY
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) throw new Error('Order not found');
    if (order.state !== 'READY') throw new Error('Only READY orders can be moved to DELIVERED');

    //Verificar que exista un rider asignado a la orden
    const riders = await this.riderRepository.getAllRiders();
    const assignedRider = riders.find(rider => rider.orderWanted === orderId);
    if (!assignedRider) throw new Error('No rider assigned to this order');

    //Actualizar estado de la orden y eliminar rider asignado
    const res = this.orderRepository.updateOrderState(orderId, 'DELIVERED');
    await this.riderRepository.deleteRider(assignedRider.id); //Eliminar rider asignado

    return res;
  }

  async cancelOrder(orderId: string): Promise<Order> {
    //Verificar que la orden exista
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) throw new Error('Order not found');

    //Verificamos si hay un rider asignado
    const riders = await this.riderRepository.getAllRiders();
    const assignedRider = riders.find(rider => rider.orderWanted === orderId);
    if (!assignedRider) throw new Error('No rider assigned to this order');

    //Actualizar estado de la orden y eliminar rider asignado
    const res = this.orderRepository.updateOrderState(orderId, 'CANCELLED');
    await this.riderRepository.deleteRider(assignedRider.id);

    return res;
  }

}
