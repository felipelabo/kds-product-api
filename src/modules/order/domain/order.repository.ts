import { Order } from "./order.entities";

export abstract class OrderRepository {
  abstract getAllOrders(): Promise<Order[]>;
  abstract saveOrder(order: Order): Promise<void>;
  abstract getOrdersByState(states: string[]): Promise<Order[]>;
  abstract getOrderById(orderId: string): Promise<Order | null>;
  abstract updateOrderState(orderId: string, newState: string): Promise<Order>;
}