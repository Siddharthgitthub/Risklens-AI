import AnimatedBackground from "../components/reactbits/AnimatedBackground";
import GlassCard from "../components/reactbits/GlassCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Analysis() {

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // 🔥 answers state
  const [answers, setAnswers] = useState(
    Object.fromEntries(
      Array.from({ length: 30 }, (_, i) => [`q${i + 1}`, 3])
    )
  );

  // 🔥 loader state
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: Number(e.target.value)
    });
  };

  // 🔥 SUBMIT
  const submit = async () => {
    try {
      setLoading(true);

      const payload = {
        answers: Object.values(answers).map(Number)
      };

      console.log("SENDING:", payload);

      const res = await axios.post(`${API}/analyze`, payload);

      console.log("BACKEND RESPONSE:", res.data);

      localStorage.setItem("risklensData", JSON.stringify(res.data));

      setTimeout(() => {
        navigate("/dashboard", { state: res.data });
      }, 1500);

    } catch (err) {
      console.log(err);
      alert("Backend connection error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white relative">

      <AnimatedBackground />

      <GlassCard>

        <h2 className="text-3xl font-semibold mb-6 text-center">
          AI Behavioral Investor Analysis
        </h2>

        <p className="text-gray-400 mb-6 text-center">
          Answer honestly to get accurate AI prediction
        </p>

        {/* QUESTIONS */}
        {questions.map((q, i) => (
          <div key={i} className="mb-6">

            <label className="text-gray-300">{q.text}</label>

            <input
              type="range"
              min="1"
              max="5"
              name={q.name}
              value={answers[q.name]}
              onChange={handleChange}
              className="w-full mt-2"
            />

            <div className="flex justify-between text-sm text-gray-400">
              <span>Low</span>
              <span className="text-purple-400 font-bold text-lg">
                {answers[q.name]}
              </span>
              <span>High</span>
            </div>

          </div>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={submit}
          className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold text-lg shadow-xl"
        >
          Run AI Risk Analysis
        </motion.button>

      </GlassCard>

      {/* 🔥 AI LOADER OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center z-50">

          {/* spinning circle */}
          <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-purple-500 border-opacity-100"></div>

          <h2 className="text-3xl mt-10 text-purple-300 font-bold">
            AI analyzing your financial personality...
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Running ML models • Monte Carlo • Behavioral Engine
          </p>

          <div className="mt-8 space-y-2 text-sm text-gray-500 animate-pulse">
            <p>✔ Training Random Forest model</p>
            <p>✔ Evaluating risk tolerance</p>
            <p>✔ Generating portfolio</p>
            <p>✔ Running Monte Carlo simulation</p>
          </div>

        </div>
      )}

    </div>
  );
}


// 🔥 QUESTIONS
const questions = [
  { name: "q1", text: "I stay calm during market crashes" },
  { name: "q2", text: "I prefer long term investments" },
  { name: "q3", text: "I can tolerate temporary losses" },
  { name: "q4", text: "I invest regularly" },
  { name: "q5", text: "I track market news daily" },

  { name: "q6", text: "I have good financial knowledge" },
  { name: "q7", text: "I diversify investments" },
  { name: "q8", text: "I avoid panic selling" },
  { name: "q9", text: "I invest after research" },
  { name: "q10", text: "I follow financial planning" },

  { name: "q11", text: "I am comfortable with high risk" },
  { name: "q12", text: "I invest in stocks often" },
  { name: "q13", text: "I can handle volatility" },
  { name: "q14", text: "I seek high returns" },
  { name: "q15", text: "I invest aggressively" },

  { name: "q16", text: "I save regularly" },
  { name: "q17", text: "I manage expenses well" },
  { name: "q18", text: "I have emergency funds" },
  { name: "q19", text: "I plan retirement early" },
  { name: "q20", text: "I set financial goals" },

  { name: "q21", text: "I invest monthly" },
  { name: "q22", text: "I analyze risk before investing" },
  { name: "q23", text: "I compare multiple options" },
  { name: "q24", text: "I stay invested long term" },
  { name: "q25", text: "I avoid emotional investing" },

  { name: "q26", text: "I trust my financial decisions" },
  { name: "q27", text: "I follow expert advice" },
  { name: "q28", text: "I rebalance portfolio" },
  { name: "q29", text: "I monitor performance" },
  { name: "q30", text: "I learn from past losses" }
];
