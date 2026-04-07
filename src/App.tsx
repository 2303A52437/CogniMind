import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, LayoutDashboard, MessageSquare, Library as LibraryIcon, Menu, X } from "lucide-react";
import { INITIAL_SCORES, SkillScore } from "./types";
import Dashboard from "./components/Dashboard";
import ChatInterface from "./components/ChatInterface";
import Library from "./components/Library";

type Tab = 'dashboard' | 'chat' | 'library';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [scores, setScores] = useState<SkillScore[]>(INITIAL_SCORES);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUpdateScores = (updates: { skill: string; adjustment: number }[]) => {
    setScores(prev => prev.map(s => {
      const update = updates.find(u => u.skill === s.skill);
      if (update) {
        return { ...s, score: Math.min(100, Math.max(0, s.score + update.adjustment)) };
      }
      return s;
    }));
  };

  const navItems = [
    { id: 'chat', label: 'AI Assistant', icon: <MessageSquare size={20} /> },
    { id: 'dashboard', label: 'My Profile', icon: <LayoutDashboard size={20} /> },
    { id: 'library', label: 'Resources', icon: <LibraryIcon size={20} /> },
  ];

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white">
            <Brain size={24} />
          </div>
          <h1 className="font-serif text-2xl italic text-brand-500 tracking-tight">CogniMind</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === item.id ? 'text-brand-500' : 'text-brand-900/40 hover:text-brand-900/60'
              }`}
            >
              {item.icon}
              {item.label}
              {activeTab === item.id && (
                <motion.div layoutId="activeTab" className="h-0.5 w-full bg-brand-500 absolute -bottom-4" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-brand-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass absolute top-20 left-0 right-0 z-40 p-6 flex flex-col gap-4"
          >
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as Tab);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-4 p-4 rounded-2xl text-sm font-bold uppercase tracking-widest ${
                  activeTab === item.id ? 'bg-brand-500 text-white' : 'text-brand-900/60'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <Dashboard scores={scores} />}
            {activeTab === 'chat' && <ChatInterface scores={scores} onUpdateScores={handleUpdateScores} />}
            {activeTab === 'library' && <Library />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-12 text-center space-y-4">
        <div className="h-px w-24 bg-brand-500/20 mx-auto" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-900/40">
          CogniMind © 2026 • Cultivating Mental Resilience
        </p>
      </footer>
    </div>
  );
}
