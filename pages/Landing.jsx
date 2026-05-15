import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Landing = () => {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-neon-blue/20 blur-[120px] rounded-full pointer-events-none" />
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
          Take Control of Your <br />
          <span className="text-neon-blue text-glow-blue">Digital Footprint</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 relative z-10">
          PersonaShield uses advanced OSINT and AI to scan the deep web, social media, and data brokers to find your exposed data before attackers do.
        </p>
        
        <div className="flex gap-4 relative z-10">
          <Link to="/signup">
            <Button variant="neon" className="text-lg px-8 py-4">Start Free Scan</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" className="text-lg px-8 py-4">Dashboard Login</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-3xl font-bold text-center mb-12">Comprehensive <span className="text-neon-blue">Protection</span></h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <div className="bg-neon-blue/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-neon-blue" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Deep Web Monitoring</h3>
            <p className="text-slate-400">Continuous scanning of dark web forums, paste sites, and data breaches for your personal information.</p>
          </Card>
          
          <Card>
            <div className="bg-neon-purple/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-neon-purple/20">
              <AlertTriangle className="w-6 h-6 text-neon-purple" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Risk Scoring</h3>
            <p className="text-slate-400">Get a real-time risk score based on the severity and frequency of your online data exposures.</p>
          </Card>
          
          <Card>
            <div className="bg-neon-blue/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-neon-blue" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Privacy Remediation</h3>
            <p className="text-slate-400">Actionable, step-by-step checklists to remove your data from brokers and secure your accounts.</p>
          </Card>
        </div>
      </section>
    </div>
  );
};
