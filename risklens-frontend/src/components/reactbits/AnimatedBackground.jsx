import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">

      {/* gradient glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] bg-emerald-500/20 blur-[160px] rounded-full"/>
      <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-purple-500/20 blur-[160px] rounded-full"/>

      {/* grid animation */}
      <motion.div
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px"
        }}
      />

    </div>
  );
}
