import type { Variant } from "../../types";
import ColorChip from "../ui/ColorChip";

interface VariantSelectorProps {
	variants: Variant[];
	activeId: string;
	onSelect: (variantId: string) => void;
}

const VariantSelector = ({
	variants,
	activeId,
	onSelect,
}: VariantSelectorProps) => {
	return (
		<div className="flex flex-wrap gap-2">
			{variants.map((v) => (
				<ColorChip
					key={v.id}
					label={v.label}
					swatch={v.swatch}
					active={v.id === activeId}
					onClick={() => onSelect(v.id)}
				/>
			))}
		</div>
	);
};

export default VariantSelector;
