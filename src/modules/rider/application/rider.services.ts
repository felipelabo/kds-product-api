import { Injectable } from "@nestjs/common";
import { Rider } from "../domain/rider.entities";
import { RiderRepository } from "../domain/rider.repository";

@Injectable()
export class RiderService {
    constructor(private readonly riderRepository: RiderRepository) {}

    async getAllRiders(): Promise<Rider[]> {
        return this.riderRepository.getAllRiders();
    }

    async getRiderById(riderId: string): Promise<Rider | null> {
        return this.riderRepository.getRiderById(riderId);
    }

    async saveRider(rider: Rider): Promise<void> {
        return this.riderRepository.saveRider(rider);
    }
}