import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { AlertTriangle, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Modal } from '../components/ui/Modal';

export const ThreatReport = () => {
  const { dashboardData } = useAppContext();
  const [selectedThreat, setSelectedThreat] = useState(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Threat Report</h1>
        <p className="text-slate-400 mt-1">Detailed breakdown of exposed data and vulnerabilities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-neon-red/30">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">High Severity</p>
              <h4 className="text-2xl font-bold text-neon-red">3 Findings</h4>
            </div>
            <div className="bg-neon-red/10 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </Card>
        
        <Card className="border-yellow-500/30">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Medium Severity</p>
              <h4 className="text-2xl font-bold text-yellow-500">12 Findings</h4>
            </div>
            <div className="bg-yellow-500/10 p-2 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </Card>

        <Card className="border-neon-green/30">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Resolved Threats</p>
              <h4 className="text-2xl font-bold text-neon-green">45 Secured</h4>
            </div>
            <div className="bg-neon-green/10 p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-neon-green" />
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-4">Detailed Findings</h3>
        {dashboardData.threats.map(threat => (
          <Card key={threat.id} hover={false} className="border-dark-600/50">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded uppercase tracking-wider ${
                    threat.severity === 'High' ? 'bg-neon-red/20 text-neon-red' :
                    threat.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {threat.severity}
                  </span>
                  <span className="text-slate-400 text-sm">{threat.category} • {threat.source}</span>
                </div>
                <p className="text-white font-medium">{threat.description}</p>
              </div>
              <button 
                onClick={() => setSelectedThreat(threat)}
                className="px-4 py-2 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-lg text-sm text-slate-300 transition-colors"
              >
                View Details
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={!!selectedThreat} 
        onClose={() => setSelectedThreat(null)} 
        title="Threat Details"
      >
        {selectedThreat && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1.5 text-sm font-bold rounded uppercase tracking-wider ${
                selectedThreat.severity === 'High' ? 'bg-neon-red/20 text-neon-red' :
                selectedThreat.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                'bg-slate-700 text-slate-300'
              }`}>
                {selectedThreat.severity} Severity
              </span>
              <span className="text-slate-400">{selectedThreat.category}</span>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-1">Source</h4>
              <p className="text-white p-3 bg-dark-900 rounded-lg border border-dark-600">{selectedThreat.source}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-1">Description</h4>
              <p className="text-white p-3 bg-dark-900 rounded-lg border border-dark-600 leading-relaxed">{selectedThreat.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-1">Recommended Action</h4>
              <p className="text-neon-blue p-3 bg-neon-blue/10 rounded-lg border border-neon-blue/30 leading-relaxed">
                Immediately change your password for {selectedThreat.source} and enable Two-Factor Authentication. Monitor your accounts for suspicious activity.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
