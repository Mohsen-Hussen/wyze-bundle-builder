import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/useProducts";

const CameraStep = () => {
	const { data } = useProducts();
	const products = data?.products ?? [];
	const cameras = products.filter((p) => p.category === "cameras");

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
			{cameras.map((p) => (
				<ProductCard key={p.id} product={p} />
			))}
		</div>
	);
};

export default CameraStep;
