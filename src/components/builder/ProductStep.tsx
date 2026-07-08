import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/useProducts";
import Button from "../ui/Button";
import type { StepId } from "../../types";

interface ProductStepProps {
  stepId: StepId;
  onNext?: () => void;
}

const ProductStep = ({ stepId, onNext }: ProductStepProps) => {
  const { data } = useProducts();
  const step = data?.steps?.find((s) => s.id === stepId);
  const products = (data?.products ?? []).filter(
    (p) => p.category === step?.category,
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 desktop:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {step?.nextLabel && (
        <div className="mt-6 flex w-full justify-center">
          <Button variant="outline" onClick={onNext}>
            {step.nextLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductStep;
