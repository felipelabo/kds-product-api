import { Injectable, Inject } from "@nestjs/common";
import { Order } from "../domain/order.entities";
import { IMOrderRepository } from "../infrastructure/order.repository";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: IMOrderRepository
  ) {}

  async getAllOrders(): Promise<Order[]> {
    // Aquí puedes agregar lógica de negocio como validaciones, 
    // transformaciones, logs, etc.
    return this.orderRepository.getAllOrders();
  }

  async saveOrder(order: Order): Promise<void> {
    // Ejemplo de lógica de negocio: validaciones
    if (!order.id || !order.name) {
      throw new Error('Order must have id and customer');
    }
    
    // Aquí podrías agregar más lógica como:
    // - Validar stock
    // - Calcular totales
    // - Enviar notificaciones
    // - Audit logs
    
    return this.orderRepository.saveOrder(order);
  }

}
