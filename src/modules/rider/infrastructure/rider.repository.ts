import { Injectable } from "@nestjs/common";
import { Rider } from "../domain/rider.entities";
import { RiderRepository } from "../domain/rider.repository";

@Injectable()
export class IMRiderRepository implements RiderRepository {
  private riders: Array<Rider> = [];

  //SIMULACION BASE DE DATOS EN MEMORIA

  async getAllRiders(): Promise<Array<Rider>> {
    return this.riders;
  }

  async saveRider(rider: Rider): Promise<void> {
    this.riders.push(rider);
  }

  async getRiderById(id: string): Promise<Rider | null> {
    return this.riders.find(rider => rider.id === id) || null;
  }

  async deleteRider(riderId: string): Promise<void> {
    this.riders = this.riders.filter(rider => rider.id !== riderId);
  }
}