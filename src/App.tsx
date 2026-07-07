import BuilderAccordion from "./components/builder/BuilderAccordion";
import CameraStep from "./components/builder/CameraStep";
import ReviewPanel from "./components/review/ReviewPanel";
import CheckoutBlock from "./components/review/CheckoutBlock";

function App() {
	return (
		<div className="min-h-screen bg-white text-ink">
			<main className="mx-auto max-w-[1400px] px-6 py-10">
				<BuilderAccordion
					renderStep={(stepId) =>
						stepId === "cameras" ? <CameraStep /> : undefined
					}
				/>
				<div className="mt-8 space-y-8">
					<ReviewPanel />
					<CheckoutBlock />
				</div>
			</main>
		</div>
	);
}

export default App;
