import { motion } from "motion/react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { SkillScore } from "../types";

interface DashboardProps {
  scores: SkillScore[];
}

export default function Dashboard({ scores }: DashboardProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-4xl italic text-brand-500">Cognitive Profile</h2>
        <p className="text-brand-900/60 text-sm uppercase tracking-widest">Real-time analysis of your mental faculties</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-[400px] glass rounded-[32px] p-6 flex items-center justify-center"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={scores}>
              <PolarGrid stroke="#5a5a40" strokeOpacity={0.2} />
              <PolarAngleAxis dataKey="skill" tick={{ fill: '#1a1a1a', fontSize: 12, fontWeight: 500 }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#5a5a40"
                fill="#5a5a40"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="space-y-4">
          {scores.map((s, i) => (
            <motion.div
              key={s.skill}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-4 rounded-2xl space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-brand-900">{s.skill}</span>
                <span className="text-brand-500 font-serif italic">{s.score}%</span>
              </div>
              <div className="h-1.5 w-full bg-brand-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${s.score}%` }}
                  className="h-full bg-brand-500"
                />
              </div>
              <p className="text-xs text-brand-900/50 leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
