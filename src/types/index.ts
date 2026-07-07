export type CategoryId = "cameras" | "sensors" | "accessories" | "plan";

export interface Category {
	id: CategoryId;
	label: string;
	labelMobile?: string;
}

export interface Variant {
	id: string;
	label: string;
	swatch?: string;
	image?: string;
}

export interface Pricing {
	price: number;
	compareAt?: number;
	suffix?: string;
	free?: boolean;
}

export interface Product {
	id: string;
	name: string;
	category: CategoryId;
	image: string;
	pricing: Pricing;
	description?: string;
	learnMoreUrl?: string;
	badge?: string;
	required?: boolean;
	variants?: Variant[];
}

export interface CartEntry {
	productId: string;
	quantity: number;
	variantId?: string;
}

export type StepId = "cameras" | "plan" | "sensors" | "protection";

export interface Step {
	id: StepId;
	order: number;
	title: string;
	category: CategoryId;
	icon?: string;
	nextLabel?: string;
}
