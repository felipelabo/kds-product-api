import { Controller, Get, Post, Param, Delete } from "@nestjs/common";
import { RiderService } from "../application/rider.services";
import { Rider } from "../domain/rider.entities";

@Controller("riders")
export class RiderController {
    constructor(private readonly riderService: RiderService) {}

    @Get()
    async getAllRiders(): Promise<Rider[]> {
        return this.riderService.getAllRiders();
    }

    @Get(":id")
    async getRiderById(@Param("id") id: string): Promise<Rider | null> {
        return this.riderService.getRiderById(id);
    }

    @Post()
    async createRider(): Promise<{ message: string; data: Rider }> {
        // Aquí podrías recibir el cuerpo de la solicitud para crear un rider
        const newRider: Rider = {
            id: "1",
            orderWanted: "Sample Order",
            code: "1234"
        };
        await this.riderService.saveRider(newRider);
        return { message: "Rider created successfully", data: newRider };
    }

    @Delete(":id")
    async deleteRider(@Param("id") id: string): Promise<{ message: string; data: boolean }> {
        await this.riderService.deleteRider(id);
        return { message: "Rider deleted successfully", data:true };
    }
  
}