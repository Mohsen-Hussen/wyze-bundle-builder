import ReviewPanel from "./ReviewPanel";
import CheckoutBlock from "./CheckoutBlock";

/**
 * The order-summary container. One light-blue panel that holds the review item
 * list and the checkout block. On desktop the two sit side by side (list left,
 * checkout right); below desktop they stack.
 */
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
