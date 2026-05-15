import React from 'react';
import { ChatInterface } from '../components/chatbot/ChatInterface';
import { Bot } from 'lucide-react';

export const AIChatbot = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-neon-blue/10 rounded-xl border border-neon-blue/30 flex items-center justify-center">
          <Bot className="w-6 h-6 text-neon-blue" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">PersonaShield AI</h1>
          <p className="text-slate-400 mt-1">Ask anything about your data exposure or remediation steps.</p>
        </div>
      </div>

      <ChatInterface />
    </div>
  );
};
