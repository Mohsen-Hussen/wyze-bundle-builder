import ReviewPanel from "./ReviewPanel";
import CheckoutBlock from "./CheckoutBlock";

const SummaryPanel = () => {
  return (
    <div className="rounded-2xl bg-panelBlue p-6 desktop:grid desktop:grid-cols-[1fr_400px] desktop:gap-12 desktop:p-10 desktop:items-start">
      <ReviewPanel />
      <div className="mt-8 desktop:mt-0">
        <CheckoutBlock />
      </div>
    </div>
  );
};

export default SummaryPanel;
