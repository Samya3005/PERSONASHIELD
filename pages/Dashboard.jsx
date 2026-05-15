import React from 'react';
import { RiskScoreCard } from '../components/dashboard/RiskScoreCard';
import { ExposureStats } from '../components/dashboard/ExposureStats';
import { RecentScans } from '../components/dashboard/RecentScans';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Header } from '../components/dashboard/Header';

export const Dashboard = () => {
  const { dashboardData } = useAppContext();

  return (
    <div className="space-y-8">
      <Header />

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <RiskScoreCard score={dashboardData.riskScore} level={dashboardData.exposureLevel} />
        
        <Card className="flex flex-col justify-center min-h-[300px]">
          <h3 className="text-xl font-bold mb-2">Total Findings</h3>
          <p className="text-slate-400 text-sm mb-6">Across all connected data sources</p>
          <div className="text-6xl font-extrabold text-neon-blue text-glow-blue mb-4">
            {dashboardData.totalFindings}
          </div>
          <p className="text-slate-300 text-sm">
            <span className="text-neon-red font-medium">↑ 12%</span> increase since last scan
          </p>
        </Card>

        <ExposureStats data={dashboardData.exposureCategories} />
        
        <RecentScans scans={dashboardData.recentScans} />
      </div>
    </div>
  );
};
