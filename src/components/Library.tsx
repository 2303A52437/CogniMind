import { motion } from "motion/react";
import { BookOpen, Heart, Wind, Zap, Moon, Sun } from "lucide-react";

const RESOURCES = [
  {
    title: "Mindful Breathing",
    category: "Stress Relief",
    icon: <Wind className="text-blue-500" />,
    description: "A 5-minute exercise to ground yourself and reduce immediate anxiety.",
    steps: ["Inhale for 4 seconds", "Hold for 4 seconds", "Exhale for 6 seconds", "Repeat 5 times"]
  },
  {
    title: "The Pomodoro Technique",
    category: "Attention",
    icon: <Zap className="text-orange-500" />,
    description: "Structure your work to maintain high focus levels without burnout.",
    steps: ["25 mins focused work", "5 mins short break", "After 4 cycles, 20 min break"]
  },
  {
    title: "Sleep Hygiene",
    category: "Processing Speed",
    icon: <Moon className="text-indigo-500" />,
    description: "Optimizing your rest is the fastest way to improve cognitive clarity.",
    steps: ["No screens 1hr before bed", "Keep room cool and dark", "Consistent wake-up time"]
  },
  {
    title: "Cognitive Reframing",
    category: "Emotional Regulation",
    icon: <Heart className="text-rose-500" />,
    description: "Identify and challenge negative thought patterns.",
    steps: ["Identify the thought", "Examine the evidence", "Find a balanced perspective"]
  }
];

export default function Library() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-4xl italic text-brand-500">Resource Library</h2>
        <p className="text-brand-900/60 text-sm uppercase tracking-widest">Strategies for a resilient mind</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESOURCES.map((res, i) => (
          <motion.div
            key={res.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-[24px] space-y-4 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/50 rounded-xl shadow-sm">
                {res.icon}
              </div>
              <div>
                <h4 className="font-medium text-brand-900">{res.title}</h4>
                <span className="text-[10px] uppercase tracking-widest text-brand-500 font-bold">{res.category}</span>
              </div>
            </div>
            <p className="text-sm text-brand-900/70 leading-relaxed">{res.description}</p>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-brand-900/40 font-bold">Steps to follow:</p>
              <ul className="space-y-1">
                {res.steps.map((step, si) => (
                  <li key={si} className="text-xs flex items-center gap-2 text-brand-900/60">
                    <div className="w-1 h-1 bg-brand-500 rounded-full" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass p-8 rounded-[32px] bg-brand-500 text-white relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-lg">
          <h3 className="font-serif text-3xl italic">Daily Reflection</h3>
          <p className="text-white/80 text-sm leading-relaxed">
            "The mind is like a garden. It can grow weeds or flowers. What you plant with your thoughts determines the harvest."
          </p>
          <button className="px-6 py-2 bg-white text-brand-500 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-100 transition-colors">
            Start Journaling
          </button>
        </div>
        <div className="absolute top-[-20%] right-[-10%] opacity-10">
          <Sun size={300} />
        </div>
      </div>
    </div>
  );
}
