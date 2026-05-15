import React from 'react';
import { Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-dark-600/50 bg-dark-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-neon-blue" />
            <span className="text-xl font-bold tracking-wider text-white">
              Persona<span className="text-neon-blue text-glow-blue">Shield</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm">
            © 2026 PersonaShield Capstone Project. Built for educational purposes.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-neon-blue transition-colors">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-neon-blue transition-colors">Terms</a>
            <a href="#" className="text-slate-400 hover:text-neon-blue transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
