import { useLocation } from "react-router-dom";
import AnimatedBackground from "../components/reactbits/AnimatedBackground";
import Squares from "../components/reactbits/Squares";
import StatCard from "../components/reactbits/StatCard";
import RadarChart from "../components/reactbits/RadarChart";
import ModelChart from "../components/reactbits/ModelChart";
import MonteCarloChart from "../components/reactbits/MonteCarloChart";
import PortfolioPie from "../components/reactbits/PortfolioPie";
import { useState } from "react";

export default function Dashboard() {
  const location = useLocation();
  const saved = localStorage.getItem("risklensData");
  const data = location.state || (saved ? JSON.parse(saved) : null);

  const [showAdvisor, setShowAdvisor] = useState(false);

  if (!data) {
    return (
      <div className="text-white text-center mt-40">
        No Data Received From AI
      </div>
    );
  }

  // ===== SAFE FALLBACKS =====
  const features = data.top_features || [];
  const simulation = data.simulation || {};
  const portfolio = data.portfolio || {};
  const modelStats = data.model_stats || {};

  const safeMedian = isNaN(simulation.median) ? 50000 : simulation.median;
  const safeBest = isNaN(simulation.best) ? 80000 : simulation.best;
  const safeWorst = isNaN(simulation.worst) ? 20000 : simulation.worst;

  return (
    <div className="min-h-screen text-white p-10 relative overflow-hidden">
      {/* 🔥 Animated Squares Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Squares
          speed={0.4}
          squareSize={50}
          direction="diagonal"
          borderColor="#2b2145"
          hoverFillColor="#6d28d9"
        />
      </div>
      <div className="relative z-10"></div>

      <h1 className="text-5xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">
        AI Investor Intelligence Dashboard
      </h1>

      {/* Top stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Risk Profile"
          value={data.profile}
          sub={`Score: ${data.score}`}
        />
        <StatCard
          title="Investor Type"
          value={data.investor_type}
          sub="ML Predicted"
        />
        <StatCard
          title="Accuracy"
          value={data.accuracy + "%"}
          sub="Model accuracy"
        />
        <StatCard
          title="Confidence"
          value={data.confidence + "%"}
          sub="AI confidence"
        />
        <StatCard title="Persona" value={data.persona} sub="Behavioral AI" />
        <StatCard
          title="Risk %"
          value={data.risk_percent + "%"}
          sub="Overall risk"
        />
      </div>

      {/* Feature importance */}
      <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl mt-10 border border-white/10">
        <h2 className="text-xl mb-6">AI Behavioral Impact</h2>

        {features.map((f, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{f.feature}</span>
              <span>{(f.importance * 100).toFixed(1)}%</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-400 to-indigo-600 h-2 rounded-full"
                style={{ width: `${f.importance * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 2x2 charts */}
      <div className="grid md:grid-cols-2 gap-10 mt-12">
        <div
          className="bg-white/5 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.25)]
 p-6 rounded-2xl"
        >
          <RadarChart score={data.score || 50} />
        </div>

        <div
          className="bg-white/5 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.25)]
 p-6 rounded-2xl"
        >
          <ModelChart stats={modelStats} />
        </div>

        <div
          className="bg-white/5 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.25)]
 p-6 rounded-2xl"
        >
          <MonteCarloChart
            data={{
              median: safeMedian,
              best: safeBest,
              worst: safeWorst,
            }}
          />
        </div>

        <div
          className="bg-white/5 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.25)]
 p-6 rounded-2xl"
        >
          <PortfolioPie portfolio={portfolio} />
        </div>
      </div>

      {/* Simulation stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <StatCard
          title="Median"
          value={"₹" + safeMedian.toFixed(0)}
          sub="Expected"
        />
        <StatCard
          title="Best"
          value={"₹" + safeBest.toFixed(0)}
          sub="Optimistic"
        />
        <StatCard title="Worst" value={"₹" + safeWorst.toFixed(0)} sub="Risk" />
      </div>

      {/* ===== AI ADVISOR BUTTON ===== */}
      <div className="fixed bottom-6 right-6">
        {!showAdvisor && (
          <button
            onClick={() => setShowAdvisor(true)}
            className="bg-purple-600 px-6 py-3 rounded-xl shadow-xl"
          >
            🤖 AI Advisor
          </button>
        )}

        {showAdvisor && (
          <div className="w-[320px] bg-[#0b0b12] border border-purple-500 rounded-2xl shadow-2xl p-4">
            <h3 className="text-purple-300 mb-2 font-semibold">
              AI Investment Advisor
            </h3>

            <p className="text-sm text-gray-300">
              Based on your profile ({data.persona}), AI suggests a diversified
              portfolio with focus on {Object.keys(portfolio)[0]}.
            </p>

            <button
              onClick={() => setShowAdvisor(false)}
              className="mt-3 text-sm text-red-400"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
