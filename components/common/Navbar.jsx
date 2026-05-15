import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-neon-blue/10 p-2 rounded-lg border border-neon-blue/30 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
              <Shield className="w-8 h-8 text-neon-blue" />
            </div>
            <span className="text-2xl font-bold tracking-wider text-white">
              Persona<span className="text-neon-blue text-glow-blue">Shield</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-neon-blue transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-neon-blue transition-colors">How it Works</a>
            <div className="flex items-center gap-4 border-l border-dark-600 pl-8">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">Get Started</Button>
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-slate-300 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
