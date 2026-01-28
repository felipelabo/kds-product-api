/*export type Rider = {
	orderWanted: string
	pickup: (order?: Order) => void
}*/

export class Rider {
    constructor(
        public readonly id: string,
        public readonly orderWanted: string
    ) {}
}