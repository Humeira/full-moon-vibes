import React, { useState, useEffect } from "react";
import MoonPhase from "./components/MoonPhase";
import Countdown from "./components/Countdown";
import NextFullMoon from "./components/NextFullMoon";
import StarryBackground from "./components/Background";
import { getNextFullMoon } from "./utils/moonCalculations";
import { GithubIcon } from "lucide-react";

function App() {
  const [nextFullMoon, setNextFullMoon] = useState<Date>(() =>
    getNextFullMoon(),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a slight loading delay for the animation effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-[#111827] to-black text-white font-['Inter']">
      <StarryBackground />

      <div className="container mx-auto px-4 py-12 relative">
        <header className="text-center mb-16 opacity-0 animate-[fadeIn_1.5s_forwards_0.3s]">
          <h1 className="text-lg md:text-xl text-indigo-200 font-light tracking-wide">
            LUNAR PHASES
          </h1>
        </header>

        <main
          className={`transition-opacity duration-1000 ease-out ${loading ? "opacity-0" : "opacity-100"}`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <NextFullMoon date={nextFullMoon} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6 items-center">
              <div className="flex justify-center">
                <MoonPhase />
              </div>

              <div className="flex justify-center">
                <Countdown targetDate={nextFullMoon} />
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-20 text-center text-gray-400 text-sm">
          <p className="opacity-0 animate-[fadeIn_1s_forwards_1s]">
            Based on astronomical calculations
          </p>
          <div className="mt-4 opacity-0 animate-[fadeIn_1s_forwards_1.3s]">
            <a
              href="https://github.com/Humeira/full-moon-vibes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-300 hover:text-white transition-colors"
            >
              <GithubIcon size={16} />
              <span>View on GitHub</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
