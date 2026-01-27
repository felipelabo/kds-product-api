import { Controller, Get, Post} from "@nestjs/common";
import { OrderService } from "../application/order.services";
import { Order } from "../domain/order.entities";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Post()
  async createOrder() {
    // Aquí podrías recibir el cuerpo de la solicitud para crear una orden
    const newOrder:Order = {
        id: "1",
        name: "Sample Order",
        items: [],
        state: "PENDING"
    };
    await this.orderService.saveOrder(newOrder);
    return { message: "Order created successfully" };
  }
}