import { Controller, Get, Param, Post} from "@nestjs/common";
import { OrderService } from "../application/order.services";
import { Order } from "../domain/order.entities";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get("active")
  async getActiveOrders() {
    console.log("Fetching active orders");
    return this.orderService.getActiveOrders();
  }

  @Post(":id/in-progress")
  async moveToInProgress(@Param("id") id: string) {
    console.log("Moving order to In Progress:", id);
    try{
        const order = await this.orderService.moveToInProgress(id);
        return { message: "Order moved to In Progress", data:order };
    }catch(error){
        throw new Error('Failed to move order to In Progress');
    }
  }

  @Post(":id/ready")
  async moveToReady(@Param("id") id: string) {
    console.log("Moving order to Ready:", id);
    try{
        const order = await this.orderService.moveToReady(id);
        return { message: "Order moved to Ready", data:order };
    }catch(error){
        throw new Error('Failed to move order to Ready');
    }
  }

  @Post(":id/delivered")
  async moveToDelivered(@Param("id") id: string) {
    console.log("Moving order to Delivered:", id);
    try{
        const order = await this.orderService.moveToDelivered(id);
        return { message: "Order moved to Delivered", data:order };
    }catch(error){
        throw new Error('Failed to move order to Delivered');
    }
  }

  @Post(":id/cancelled")
  async cancelOrder(@Param("id") id: string) {
    console.log("Cancelling order:", id);
    try{
        const order = await this.orderService.cancelOrder(id);
        return { message: "Order cancelled", data:order };
    }catch(error){
        throw new Error('Failed to cancel order');
    }
  }
}