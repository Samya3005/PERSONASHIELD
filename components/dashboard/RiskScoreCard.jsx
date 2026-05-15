import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';

export const RiskScoreCard = ({ score, level }) => {
  const data = [{ name: 'Score', value: score, fill: '#ff003c' }]; // Red for high risk

  return (
    <Card className="flex flex-col items-center justify-center min-h-[300px]">
      <h3 className="text-xl font-bold mb-2">Overall Risk Score</h3>
      <p className="text-slate-400 text-sm mb-4">Based on recent OSINT scans</p>
      
      <div className="h-48 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="70%" 
            outerRadius="100%" 
            barSize={15} 
            data={data} 
            startAngle={180} 
            endAngle={0}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar background clockWise dataKey="value" cornerRadius={10} fill="#b026ff" />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-5xl font-extrabold text-white text-glow-purple">{score}</span>
          <p className="text-neon-red font-medium uppercase tracking-wider mt-1">{level} EXPOSURE</p>
        </div>
      </div>
    </Card>
  );
};
