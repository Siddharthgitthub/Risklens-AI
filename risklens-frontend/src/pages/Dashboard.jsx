import { useLocation } from "react-router-dom";
import AnimatedBackground from "../components/reactbits/AnimatedBackground";
import StatCard from "../components/reactbits/StatCard";
import MonteCarlo from "../components/reactbits/MonteCarlo";
import RadarChart from "../components/reactbits/RadarChart";
import ModelChart from "../components/reactbits/ModelChart";
import MonteCarloChart from "../components/reactbits/MonteCarloChart";
import PortfolioPie from "../components/reactbits/PortfolioPie";

export default function Dashboard() {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return <h1 className="text-white text-center mt-40">No data</h1>;
  }

  return (
    <div className="min-h-screen text-white p-10 relative">
      <AnimatedBackground />

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
        AI Investor Intelligence Dashboard
      </h1>

      {/* DOWNLOAD PDF */}
      <button
        onClick={async () => {
          await fetch("http://localhost:5000/download-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
            .then((res) => res.blob())
            .then((blob) => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "RiskLens_Report.pdf";
              a.click();
            });
        }}
        className="px-6 py-3 bg-purple-600 rounded-xl mb-10 hover:bg-purple-700 transition"
      >
        Download AI Report
      </button>

      {/* TOP STAT CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Risk Profile" value={data.profile} sub={`Score: ${data.score}`} />
        <StatCard title="AI Investor Type" value={data.investor_type} sub="Predicted by ML" />
        <StatCard title="Model Accuracy" value={data.accuracy + "%"} sub="Model performance" />
        <StatCard title="AI Confidence" value={data.confidence + "%"} sub="Prediction confidence" />
        <StatCard title="Investor Persona" value={data.persona} sub="Behavior classification" />
        <StatCard title="Risk Score" value={data.risk_percent + "%"} sub="Overall investor risk" />
      </div>

      {/* FEATURE IMPORTANCE */}
      <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl mt-10 border border-white/10">
        <h2 className="text-xl mb-6">AI Behavioral Impact Analysis</h2>

        {data.top_features.map((f, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{f.feature}</span>
              <span>{(f.importance * 100).toFixed(1)}%</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-400 to-indigo-500 h-2 rounded-full"
                style={{ width: `${f.importance * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ===== 2x2 CHART GRID ===== */}
      <div className="grid md:grid-cols-2 gap-10 mt-12">

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:scale-[1.02] transition">
          <RadarChart score={data.score} />
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:scale-[1.02] transition">
          <ModelChart stats={data.model_stats} />
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:scale-[1.02] transition">
          <MonteCarloChart data={data.simulation} />
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:scale-[1.02] transition">
          <PortfolioPie portfolio={data.portfolio} />
        </div>

      </div>

      {/* EXTRA MONTE CARLO TEXT */}
      <div className="mt-10">
        <MonteCarlo />
      </div>

      {/* SIMULATION RESULTS */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <StatCard title="Median Portfolio" value={"₹" + data.simulation.median.toFixed(0)} sub="Expected return" />
        <StatCard title="Best Case" value={"₹" + data.simulation.best.toFixed(0)} sub="Optimistic scenario" />
        <StatCard title="Worst Case" value={"₹" + data.simulation.worst.toFixed(0)} sub="Risk scenario" />
      </div>

      {/* ===== FLOATING AI BUTTON ===== */}
      <button
        onClick={() => {
          const chat = document.getElementById("aiChatBox");
          chat.style.display = chat.style.display === "none" ? "block" : "none";
        }}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-xl z-50"
      >
        🤖 AI Advisor
      </button>

      {/* ===== AI CHAT POPUP ===== */}
      <div
        id="aiChatBox"
        style={{ display: "none" }}
        className="fixed bottom-20 right-6 w-[330px] bg-[#0b0b12] border border-purple-500/30 rounded-2xl shadow-2xl p-4 z-50"
      >
        <h3 className="text-purple-300 mb-2 font-semibold">AI Investor Advisor</h3>

        <div id="chatBox" className="h-[220px] overflow-y-auto text-sm mb-3 space-y-2" />

        <input
          id="chatInput"
          placeholder="Ask about risk, returns, investing..."
          className="w-full p-2 rounded bg-black border border-purple-500 text-white"
        />

        <button
          onClick={() => {
            const input = document.getElementById("chatInput");
            const box = document.getElementById("chatBox");

            const msg = input.value;
            if (!msg) return;

            box.innerHTML += `<div class='text-right text-purple-300'>${msg}</div>`;

            let reply = "";

            if (msg.toLowerCase().includes("risk")) {
              reply = `Your risk profile is ${data.profile}. Follow ${data.investor_type} strategy.`;
            } else if (msg.toLowerCase().includes("invest")) {
              reply = `AI suggests diversified portfolio with focus on ${data.portfolio[0]}.`;
            } else if (msg.toLowerCase().includes("return")) {
              reply = `Expected median portfolio ₹${data.simulation.median.toFixed(0)} based on simulation.`;
            } else if (msg.toLowerCase().includes("safe")) {
              reply = `Safer investing: mutual funds, bonds & long-term strategy.`;
            } else {
              reply = `Based on your persona (${data.persona}), maintain disciplined investing.`;
            }

            setTimeout(() => {
              box.innerHTML += `<div class='text-green-400'>${reply}</div>`;
              box.scrollTop = box.scrollHeight;
            }, 500);

            input.value = "";
          }}
          className="mt-2 w-full bg-purple-600 py-2 rounded"
        >
          Ask AI
        </button>
      </div>
    </div>
  );
}
