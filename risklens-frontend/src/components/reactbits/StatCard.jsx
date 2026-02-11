import { motion } from "framer-motion";

export default function StatCard({title,value,sub}){

  return(
    <motion.div
    initial={{opacity:0,y:40}}
    animate={{opacity:1,y:0}}
    whileHover={{y:-8, scale:1.02}}
    className="
    bg-white/5 backdrop-blur-xl 
    border border-white/10
    rounded-2xl p-6
    shadow-xl shadow-black/40
    "
    >

      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl mt-2 text-emerald-400">{value}</h2>
      <p className="text-gray-500 text-sm mt-2">{sub}</p>

    </motion.div>
  )
}
