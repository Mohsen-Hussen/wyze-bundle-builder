import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/useProducts";
import Button from "../ui/Button";

interface CameraStepProps {
  onNext?: () => void;
}

const CameraStep = ({ onNext }: CameraStepProps) => {
  const { data } = useProducts();
  const products = data?.products ?? [];
  const cameras = products.filter((p) => p.category === "cameras");
  const nextLabel =
    data?.steps?.find((s) => s.id === "cameras")?.nextLabel ?? "Next";

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 desktop:grid-cols-5">
        {cameras.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-6 flex w-full justify-center">
        <Button variant="outline" onClick={onNext}>
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};

export default CameraStep;
