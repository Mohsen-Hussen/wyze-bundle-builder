import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/useProducts";
import Button from "../ui/Button";

const CameraStep = () => {
	const { data } = useProducts();
	const products = data?.products ?? [];
	const cameras = products.filter((p) => p.category === "cameras");
	const nextLabel =
		data?.steps?.find((s) => s.id === "cameras")?.nextLabel ?? "Next";

	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
				{cameras.map((p) => (
					<ProductCard key={p.id} product={p} />
				))}
			</div>
			<div className="w-full flex justify-center mt-6">
				<Button variant="outline">{nextLabel}</Button>
			</div>
		</div>
	);
};

export default CameraStep;
