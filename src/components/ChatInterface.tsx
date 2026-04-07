import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Brain, ShieldCheck } from "lucide-react";
import { Message, SkillScore } from "../types";
import { getChatResponse } from "../services/gemini";

interface ChatInterfaceProps {
  scores: SkillScore[];
  onUpdateScores: (updates: { skill: string; adjustment: number }[]) => void;
}

export default function ChatInterface({ scores, onUpdateScores }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello. I'm CogniMind. I'm here to help you understand and improve your cognitive health. Shall we begin with a few questions to see how you're doing today?", timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await getChatResponse([...messages, userMsg], scores);
      
      const modelMsg: Message = { 
        role: 'model', 
        text: response.text, 
        timestamp: new Date().toISOString() 
      };
      
      setMessages(prev => [...prev, modelMsg]);
      
      if (response.scoreUpdates) {
        onUpdateScores(response.scoreUpdates);
      }
      
      if (response.strategy) {
        setMessages(prev => [...prev, {
          role: 'model',
          text: `💡 **Strategy Suggestion:** ${response.strategy}`,
          timestamp: new Date().toISOString()
        }]);
      }

    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] glass rounded-[32px] overflow-hidden">
      <div className="p-6 border-b border-brand-500/10 flex items-center justify-between bg-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white">
            <Brain size={20} />
          </div>
          <div>
            <h3 className="font-serif text-xl italic text-brand-500">CogniMind Assistant</h3>
            <p className="text-[10px] uppercase tracking-widest text-brand-900/40">AI Diagnostic Companion</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-500 text-[10px] font-bold uppercase tracking-tighter flex items-center gap-1">
            <ShieldCheck size={12} /> Secure
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                m.role === 'user' 
                  ? 'bg-brand-500 text-white rounded-tr-none' 
                  : 'bg-white/60 text-brand-900 rounded-tl-none shadow-sm'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                <span className="text-[8px] opacity-40 mt-2 block uppercase tracking-widest">
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white/60 p-4 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-brand-500/40 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-brand-500/40 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-brand-500/40 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-6 bg-white/20 border-t border-brand-500/10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share your thoughts or answer the question..."
            className="w-full bg-white/80 border border-brand-500/20 rounded-full py-4 pl-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-brand-900/30"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 p-3 bg-brand-500 text-white rounded-full hover:bg-brand-500/90 transition-colors shadow-lg shadow-brand-500/20"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center mt-4 text-brand-900/30 uppercase tracking-[0.2em]">
          Powered by Gemini AI • Always consult a professional for medical advice
        </p>
      </div>
    </div>
  );
}
