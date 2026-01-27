import { Order } from "./order.entities";

/*export interface OrderRepository {
  getAllOrders(): Promise<Array<Order>>;
  saveOrder(order: Order): Promise<void>;
}*/

export abstract class OrderRepository {
  abstract getAllOrders(): Promise<Order[]>;
  abstract saveOrder(order: Order): Promise<void>;
}