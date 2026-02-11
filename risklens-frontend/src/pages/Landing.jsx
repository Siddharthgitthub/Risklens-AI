import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingLines from "../components/reactbits/FloatingLines";
import TextType from "../components/reactbits/TextType";

export default function Landing(){

  const navigate = useNavigate();

  return(
    <div className="min-h-screen flex items-center justify-center text-center text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <FloatingLines
          lineCount={[8,10,8]}
          lineDistance={[6,8,6]}
          animationSpeed={0.5}
          interactive={true}
          parallax={true}
          bendStrength={-1.5}
          parallaxStrength={0.8}
          linesGradient={["#7c3aed","#6366f1","#a855f7"]}
        />
      </div>

      {/* CENTER GLASS PANEL */}
      <motion.div
        initial={{opacity:0,scale:0.9}}
        animate={{opacity:1,scale:1}}
        transition={{duration:1}}
        className="z-10 backdrop-blur-2xl bg-white/5 border border-white/10 
        px-20 py-16 rounded-[40px] shadow-[0_0_80px_rgba(139,92,246,0.35)]"
      >

        {/* MAIN TITLE */}
        <motion.h1
          initial={{opacity:0,y:80}}
          animate={{opacity:1,y:0}}
          transition={{duration:1}}
          className="text-8xl font-extrabold tracking-tight"
        >
          <span className="bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
            RiskLens AI
          </span>
        </motion.h1>

        {/* AI TYPING TEXT */}
        <div className="mt-8 text-2xl font-semibold text-purple-200">

          <TextType
            text={[
              "AI powered behavioral finance intelligence",
              "Real market data driven predictions",
              "Monte Carlo + Machine Learning fusion",
              "Built for next generation investors"
            ]}
            typingSpeed={40}
            pauseDuration={1800}
            deletingSpeed={25}
            showCursor={true}
            cursorCharacter="▌"
          />
        </div>

        {/* SUBTEXT */}
        <p className="mt-6 text-black text-lg max-w-xl mx-auto font-semibold drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]">
          Advanced investor psychology detection, portfolio simulation and
          real-time financial intelligence powered by AI.
        </p>

        {/* BUTTON */}
        <motion.button
          whileHover={{scale:1.15}}
          whileTap={{scale:0.9}}
          onClick={()=>navigate("/analysis")}
          className="mt-12 px-16 py-5 rounded-2xl 
          bg-gradient-to-r from-purple-500 to-indigo-600 
          text-white font-bold text-lg 
          shadow-lg shadow-purple-500/40
          hover:shadow-purple-400/100
          transition-all duration-300"
        >
          Launch AI Analysis
        </motion.button>

        {/* FLOATING STATS */}
        <div className="mt-12 grid grid-cols-3 gap-6">

          <div className="bg-white/5 p-4 rounded-xl backdrop-blur-md border border-white/10">
            <h3 className="text-purple-300 text-sm">AI Accuracy</h3>
            <p className="text-2xl font-bold text-white">96.2%</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl backdrop-blur-md border border-white/10">
            <h3 className="text-purple-300 text-sm">Datasets Used</h3>
            <p className="text-2xl font-bold text-white">NSE + Kaggle</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl backdrop-blur-md border border-white/10">
            <h3 className="text-purple-300 text-sm">ML Models</h3>
            <p className="text-2xl font-bold text-white">3 Active</p>
          </div>

        </div>

      </motion.div>
    </div>
  )
}
