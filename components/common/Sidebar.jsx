import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Bot, 
  CheckSquare, 
  Settings, 
  LogOut,
  Shield
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Sidebar = () => {
  const { logout } = useAppContext();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: ShieldAlert, label: 'Threat Report', path: '/dashboard/threats' },
    { icon: Bot, label: 'AI Assistant', path: '/dashboard/chatbot' },
    { icon: CheckSquare, label: 'Remediation', path: '/dashboard/remediation' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <aside className="w-64 glass-panel border-y-0 border-l-0 h-screen fixed left-0 top-0 flex flex-col z-20">
      <div className="p-6 flex items-center gap-3 border-b border-dark-600/50">
        <div className="bg-neon-blue/10 p-2 rounded-lg border border-neon-blue/30">
          <Shield className="w-6 h-6 text-neon-blue" />
        </div>
        <span className="text-xl font-bold text-white tracking-wider">Persona<span className="text-neon-blue">Shield</span></span>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive 
                  ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20 shadow-[0_0_10px_rgba(0,240,255,0.1)]' 
                  : 'text-slate-400 hover:text-white hover:bg-dark-700/50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-dark-600/50">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-slate-400 hover:text-neon-red hover:bg-neon-red/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
