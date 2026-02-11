import AnimatedBackground from "../components/reactbits/AnimatedBackground";
import GlassCard from "../components/reactbits/GlassCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Analysis(){

  const navigate = useNavigate();

  const [answers,setAnswers] = useState(
    Object.fromEntries(
      Array.from({length:30},(_,i)=>[`q${i+1}`,3])
    )
  );

  const handleChange=(e)=>{
    setAnswers({...answers,[e.target.name]:e.target.value})
  }

  const submit = async () => {
    try{
      const response = await axios.post("http://localhost:5000/analyze",{
        answers:Object.values(answers).map(Number)
      });

      navigate("/dashboard",{state:response.data});

    }catch(err){
      console.log(err);
      alert("Backend connection error");
    }
  };

  return(
    <div className="min-h-screen flex items-center justify-center text-white relative">

      <AnimatedBackground/>

      <GlassCard>

        <h2 className="text-3xl font-semibold mb-6 text-center">
        AI Behavioral Investor Analysis
        </h2>

        <p className="text-gray-400 mb-6 text-center">
        Answer honestly to get accurate AI financial personality prediction
        </p>

        {questions.map((q,i)=>(
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
              <span className="text-emerald-400 font-bold">
                Score: {answers[q.name]}
              </span>
              <span>High</span>
            </div>

          </div>
        ))}

        <motion.button
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        onClick={submit}
        className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-green-600 text-black font-semibold text-lg"
        >
        Run AI Risk Analysis
        </motion.button>

      </GlassCard>

    </div>
  )
}

const questions = [
{ name:"q1", text:"I stay calm during market crashes" },
{ name:"q2", text:"I prefer long term investments" },
{ name:"q3", text:"I can tolerate temporary losses" },
{ name:"q4", text:"I invest regularly" },
{ name:"q5", text:"I track market news daily" },

{ name:"q6", text:"I have good financial knowledge" },
{ name:"q7", text:"I diversify investments" },
{ name:"q8", text:"I avoid panic selling" },
{ name:"q9", text:"I invest after research" },
{ name:"q10", text:"I follow financial planning" },

{ name:"q11", text:"I am comfortable with high risk" },
{ name:"q12", text:"I invest in stocks often" },
{ name:"q13", text:"I can handle volatility" },
{ name:"q14", text:"I seek high returns" },
{ name:"q15", text:"I invest aggressively" },

{ name:"q16", text:"I save regularly" },
{ name:"q17", text:"I manage expenses well" },
{ name:"q18", text:"I have emergency funds" },
{ name:"q19", text:"I plan retirement early" },
{ name:"q20", text:"I set financial goals" },

{ name:"q21", text:"I invest monthly" },
{ name:"q22", text:"I analyze risk before investing" },
{ name:"q23", text:"I compare multiple options" },
{ name:"q24", text:"I stay invested long term" },
{ name:"q25", text:"I avoid emotional investing" },

{ name:"q26", text:"I trust my financial decisions" },
{ name:"q27", text:"I follow expert advice" },
{ name:"q28", text:"I rebalance portfolio" },
{ name:"q29", text:"I monitor performance" },
{ name:"q30", text:"I learn from past losses" }
];
