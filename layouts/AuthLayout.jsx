import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neon-blue/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neon-purple/10 blur-[100px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link to="/" className="flex justify-center items-center gap-2 mb-8 group">
          <div className="bg-neon-blue/10 p-2 rounded-lg border border-neon-blue/30 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
            <Shield className="w-10 h-10 text-neon-blue" />
          </div>
          <span className="text-3xl font-bold tracking-wider text-white">
            Persona<span className="text-neon-blue text-glow-blue">Shield</span>
          </span>
        </Link>
        <Outlet />
      </div>
    </div>
  );
};
