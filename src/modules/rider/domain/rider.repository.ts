import { Rider } from './rider.entities';

export abstract class RiderRepository {
    abstract getAllRiders(): Promise<Rider[]>;
    abstract getRiderById(riderId: string): Promise<Rider | null>;
    abstract saveRider(rider: Rider): Promise<void>;
}