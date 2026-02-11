import { motion } from "framer-motion";

export default function GlassCard({children}){

  return(
    <motion.div
    initial={{opacity:0,y:40}}
    animate={{opacity:1,y:0}}
    whileHover={{scale:1.02}}
    className="
    bg-white/5 backdrop-blur-xl 
    border border-white/10
    rounded-2xl p-8 
    shadow-xl shadow-black/30
    "
    >
      {children}
    </motion.div>
  )
}
