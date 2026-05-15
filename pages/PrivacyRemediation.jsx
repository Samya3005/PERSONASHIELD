import React from 'react';
import { Card } from '../components/ui/Card';
import { CheckSquare, Square, ExternalLink } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const PrivacyRemediation = () => {
  const { dashboardData, toggleTaskCompletion } = useAppContext();
  
  const completedTasks = dashboardData.remediationTasks.filter(t => t.completed).length;
  const totalTasks = dashboardData.remediationTasks.length;
  const progress = Math.round((completedTasks / totalTasks) * 100) || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Privacy Remediation</h1>
        <p className="text-slate-400 mt-1">Step-by-step checklist to secure your digital footprint.</p>
      </div>

      <Card hover={false} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Remediation Progress</h3>
          <span className="text-neon-blue font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-dark-600 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-neon-blue to-neon-purple h-3 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(0,240,255,0.4)]" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-slate-400 text-right">{completedTasks} of {totalTasks} tasks completed</p>
      </Card>

      <div className="space-y-4">
        {dashboardData.remediationTasks.map(task => (
          <Card key={task.id} hover={true} className={`transition-all ${task.completed ? 'opacity-60' : ''}`}>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => toggleTaskCompletion(task.id)}
                className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded transition-colors ${
                  task.completed ? 'text-neon-green' : 'text-slate-400 hover:text-neon-blue'
                }`}
              >
                {task.completed ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
              </button>
              
              <div className="flex-1">
                <h4 className={`text-lg font-medium ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    task.impact === 'Critical' ? 'bg-neon-red/20 text-neon-red' :
                    task.impact === 'High' ? 'bg-orange-500/20 text-orange-500' :
                    'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {task.impact} Impact
                  </span>
                </div>
              </div>

              <button className="text-slate-400 hover:text-white transition-colors" title="View Instructions">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
