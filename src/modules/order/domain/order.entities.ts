export type Item = {
	id: string
	name: string
	image: string
	price: {
		currency: string
		amount: number
	}
	note?: string
	quantity?: number
}

export type OrderState = "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED"

export class Order {
    constructor(
        public readonly id: string,
        public state: OrderState,
        public items: Array<Item>,
        public name?: string,
        public date?: Date
    ) {}   
}