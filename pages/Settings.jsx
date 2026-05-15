import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { User, Bell, Shield, Key } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import { Toast } from '../components/ui/Toast';

export const Settings = () => {
  const { user, updateUser } = useAppContext();
  const [activeTab, setActiveTab] = useState('profile');
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(formData);
    setShowToast(true);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'scan', label: 'Scan Preferences', icon: Shield },
    { id: 'security', label: 'Security', icon: Key },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Settings & Profile</h1>
        <p className="text-slate-400 mt-1">Manage your account preferences and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20' 
                    : 'text-slate-400 hover:bg-dark-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="md:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <>
              <Card hover={false}>
                <h3 className="text-xl font-bold mb-6">Profile Information</h3>
                <form className="space-y-4" onSubmit={handleSave}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">First Name</label>
                      <input 
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2.5 text-white focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Last Name</label>
                      <input 
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2.5 text-white focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-colors" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2.5 text-slate-400 cursor-not-allowed" 
                      disabled 
                    />
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button type="submit" variant="primary">Save Changes</Button>
                  </div>
                </form>
              </Card>
              
              <Card hover={false} className="border-neon-red/20">
                <h3 className="text-xl font-bold mb-2 text-neon-red">Danger Zone</h3>
                <p className="text-slate-400 text-sm mb-4">Permanently delete your account and all associated data.</p>
                <Button variant="danger" onClick={() => alert("Account deletion process initiated. Please check your email to confirm.")}>Delete Account</Button>
              </Card>
            </>
          )}

          {activeTab === 'notifications' && (
            <Card hover={false}>
              <h3 className="text-xl font-bold mb-6">Notification Preferences</h3>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowToast(true); }}>
                <div className="flex items-center justify-between py-3 border-b border-dark-600/50">
                  <div>
                    <h4 className="text-white font-medium">Email Alerts</h4>
                    <p className="text-sm text-slate-400">Receive an email when new threats are found.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-dark-600/50">
                  <div>
                    <h4 className="text-white font-medium">Weekly Summary</h4>
                    <p className="text-sm text-slate-400">Receive a weekly overview of your digital footprint.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-white font-medium">Critical Push Notifications</h4>
                    <p className="text-sm text-slate-400">Get instant alerts in your browser for high severity threats.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button type="submit" variant="primary">Save Preferences</Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'scan' && (
            <Card hover={false}>
              <h3 className="text-xl font-bold mb-6">Scan Preferences</h3>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowToast(true); }}>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Automated Scan Frequency</label>
                  <select className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors appearance-none">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-dark-600/50 mt-4">
                  <div>
                    <h4 className="text-white font-medium">Deep Web Scanning</h4>
                    <p className="text-sm text-slate-400">Include dark web forums and data broker sites.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button type="submit" variant="primary">Update Scan Settings</Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card hover={false}>
              <h3 className="text-xl font-bold mb-6">Security Settings</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowToast(true); }}>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2.5 text-white focus:border-neon-blue focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2.5 text-white focus:border-neon-blue focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2.5 text-white focus:border-neon-blue focus:outline-none" />
                </div>
                <div className="pt-6 flex justify-end">
                  <Button type="submit" variant="primary">Update Security</Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>

      <Toast 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
        message="Changes saved successfully!" 
      />
    </div>
  );
};
