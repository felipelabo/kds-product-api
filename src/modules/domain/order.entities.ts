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

/*export type Order = {
	id: string
	state: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED"
	items: Array<Item>
	name?: string
	date?: string
}*/

export class Order {
    constructor(
        public readonly id: string,
        public state: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED",
        public items: Array<Item>,
        public name?: string,
        public date?: Date
    ) {}   
}