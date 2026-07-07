import BuilderAccordion from "./components/builder/BuilderAccordion";
import CameraStep from "./components/builder/CameraStep";

function App() {
	return (
		<div className="min-h-screen bg-white text-ink">
			<main className="mx-auto max-w-[1400px] px-6 py-10">
				<BuilderAccordion
					renderStep={(stepId) =>
						stepId === "cameras" ? <CameraStep /> : undefined
					}
				/>
			</main>
		</div>
	);
}

export default App;
