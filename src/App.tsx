import BuilderAccordion from "./components/builder/BuilderAccordion";
import CameraStep from "./components/builder/CameraStep";
import SummaryPanel from "./components/review/SummaryPanel";

function App() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <main className="mx-auto max-w-[1400px] px-6 py-10">
        <h1 className="mb-6 text-center text-30 font-bold text-ink md:hidden">
          Let&apos;s get started!
        </h1>
        <div className="md:flex md:items-start md:gap-8 desktop:block">
          <div className="md:min-w-0 md:flex-1">
            <BuilderAccordion
              renderStep={(stepId) =>
                stepId === "cameras" ? <CameraStep /> : undefined
              }
            />
          </div>
          <div className="mt-8 md:mt-0 md:w-[380px] md:shrink-0 md:sticky md:top-6 desktop:mt-8 desktop:w-full desktop:static">
            <SummaryPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
