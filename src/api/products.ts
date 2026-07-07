import type { Product, Category, Step, Pricing } from "../types";
import catalog from "../data/products.json";

export interface ShippingInfo extends Pricing {
	label: string;
	icon?: string;
}

export interface Catalog {
	products: Product[];
	categories: Category[];
	steps: Step[];
	shipping: ShippingInfo;
}

export const fetchProducts = async (): Promise<Catalog> => {
	return catalog as unknown as Catalog;
};
