'use client';

import { useChat } from '@ai-sdk/react';

/**
 * PERSONAL WEBSITE COMPONENT
 * Branding: Full Stack Developer (4+ Years Experience)
 * Tech Stack: Groq + LangChain + AI SDK 4.0
 */
export default function PortfolioAssistant() {
  // TypeScript now recognizes all helpers correctly
  const { 
    messages, 
    error 
  } = useChat({
    
  });

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col min-h-screen">
      {/* Main Branding Section */}
      <header className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Full Stack Developer
        </h1>
        <p className="text-xl text-slate-600 mt-2">
          4+ Years of Professional Experience | Specialized in AI Orchestration
        </p>
      </header>

      {/* Chat Interface */}
      <main className="flex-1 space-y-6 overflow-y-auto pb-32">
        {messages.map(m => (
          <div 
            key={m.id} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-100 text-slate-800 rounded-bl-none'
            }`}>
              <p className="text-sm font-bold uppercase opacity-50 mb-1">{m.role}</p>
              <p className="leading-relaxed">{}</p>
            </div>
          </div>
        ))}
        {true && (
          <div className="text-slate-400 text-sm animate-pulse italic">
            Assistant is typing via Groq...
          </div>
        )}
        {error && <div className="text-red-500 text-sm">Error: {error.message}</div>}
      </main>

      {/* Managed Form State */}
      <form 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
      >
        <div className="relative">
          <input
            className="w-full p-4 pr-16 border border-slate-300 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            
            placeholder="Ask about my tech stack or 4+ years of experience..."
            
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}