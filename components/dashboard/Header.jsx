import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, Settings, LogOut, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '../ui/Modal';

export const Header = () => {
  const { user, logout, dashboardData } = useAppContext();
  const navigate = useNavigate();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAllNotifsModalOpen, setIsAllNotifsModalOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New High Severity Threat', desc: 'Your password was found in a new data breach. Action required.', time: '10 mins ago', type: 'high', read: false },
    { id: 2, title: 'Deep Scan Completed', desc: 'Monthly automated deep web scan finished with 0 new findings.', time: '2 hours ago', type: 'info', read: false }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const searchResults = dashboardData.threats.filter(t => 
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3); // Max 3 results

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-40">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back, {user?.firstName || 'User'}. Here is your latest OSINT summary.</p>
      </div>
      
      <div className="flex items-center gap-4 w-full md:w-auto relative">
        {/* Search */}
        <div className="relative flex-1 md:w-64" ref={searchRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search findings..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full bg-dark-800 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors"
          />
          
          <AnimatePresence>
            {isSearchOpen && searchQuery && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-dark-800 border border-dark-600 rounded-lg shadow-xl overflow-hidden"
              >
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2 pt-1">Threats Found</div>
                    {searchResults.map(result => (
                      <Link 
                        key={result.id} 
                        to="/dashboard/threats"
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-start gap-3 p-2 hover:bg-dark-700 rounded-md transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4 text-neon-blue mt-0.5" />
                        <div>
                          <p className="text-sm text-white font-medium line-clamp-1">{result.category}</p>
                          <p className="text-xs text-slate-400 line-clamp-1">{result.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-slate-400 text-sm">No results found</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2.5 bg-dark-800 border border-dark-600 rounded-lg text-slate-400 hover:text-white hover:border-neon-blue transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-neon-red rounded-full"></span>
            )}
          </button>
          
          <AnimatePresence>
            {isNotifOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-80 bg-dark-800 border border-dark-600 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                <div className="p-4 border-b border-dark-600 flex justify-between items-center bg-dark-900/50">
                  <h3 className="font-bold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-neon-red text-white px-2 py-0.5 rounded-full">{unreadCount} New</span>
                  )}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? notifications.slice(0, 3).map((notif) => (
                    <div 
                      key={notif.id}
                      className={`p-4 border-b border-dark-600/50 hover:bg-dark-700/50 transition-colors cursor-pointer flex gap-3 ${!notif.read ? 'bg-dark-700/20' : ''}`}
                    >
                      <div className={`${notif.type === 'high' ? 'bg-neon-red/10' : 'bg-neon-blue/10'} p-2 rounded-full h-fit`}>
                        {notif.type === 'high' ? <AlertTriangle className="w-4 h-4 text-neon-red" /> : <ShieldAlert className="w-4 h-4 text-neon-blue" />}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${!notif.read ? 'text-white' : 'text-slate-300'}`}>{notif.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{notif.desc}</p>
                        <p className="text-xs text-slate-500 mt-2">{notif.time}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="p-4 text-center text-slate-400 text-sm">No notifications</div>
                  )}
                </div>
                <div className="p-2 border-t border-dark-600 flex justify-between bg-dark-900/50">
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1"
                  >
                    Mark all as read
                  </button>
                  <button 
                    onClick={() => {
                      setIsNotifOpen(false);
                      setIsAllNotifsModalOpen(true);
                    }}
                    className="text-xs text-neon-blue hover:text-white transition-colors px-2 py-1 font-medium"
                  >
                    View All
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-10 h-10 rounded-lg bg-neon-purple/20 border border-neon-purple/50 flex items-center justify-center text-neon-purple font-bold hover:bg-neon-purple/30 transition-colors"
          >
            {user?.firstName?.charAt(0) || <User className="w-5 h-5" />}
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-48 bg-dark-800 border border-dark-600 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                <div className="p-4 border-b border-dark-600 bg-dark-900/50">
                  <p className="text-sm font-bold text-white truncate">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{user?.email}</p>
                </div>
                <div className="p-2">
                  <Link 
                    to="/dashboard/settings" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-dark-700 rounded-md transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neon-red hover:bg-neon-red/10 rounded-md transition-colors mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Modal isOpen={isAllNotifsModalOpen} onClose={() => setIsAllNotifsModalOpen(false)} title="All Notifications">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {notifications.length > 0 ? notifications.map((notif) => (
            <div 
              key={notif.id}
              className={`p-4 border border-dark-600/50 rounded-lg flex gap-4 ${!notif.read ? 'bg-dark-700/40' : 'bg-dark-800'}`}
            >
              <div className={`${notif.type === 'high' ? 'bg-neon-red/10' : 'bg-neon-blue/10'} p-3 rounded-full h-fit mt-1`}>
                {notif.type === 'high' ? <AlertTriangle className="w-5 h-5 text-neon-red" /> : <ShieldAlert className="w-5 h-5 text-neon-blue" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className={`font-medium ${!notif.read ? 'text-white' : 'text-slate-300'}`}>{notif.title}</p>
                  <span className="text-xs text-slate-500 whitespace-nowrap ml-4">{notif.time}</span>
                </div>
                <p className="text-sm text-slate-400">{notif.desc}</p>
              </div>
            </div>
          )) : (
            <div className="p-8 text-center text-slate-400">You have no notifications.</div>
          )}
        </div>
      </Modal>
    </header>
  );
};
