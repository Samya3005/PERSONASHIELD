import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { CheckCircle2 } from 'lucide-react';
import { Modal } from '../ui/Modal';

export const RecentScans = ({ scans }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // We can pretend there are more scans for the modal, or just show the same list.
  // The user asked to show a modal when "view all" is clicked.
  const allScans = [...scans, 
    { id: 'rs4', type: 'Social Media Audit', date: '2023-10-20', status: 'Completed', findings: '0 High' },
    { id: 'rs5', type: 'Pastebin Search', date: '2023-10-18', status: 'Completed', findings: '1 Medium' }
  ];

  return (
    <>
      <Card className="col-span-full xl:col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Recent Scans</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-neon-blue hover:text-white transition-colors"
          >
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-dark-600/50 text-slate-400 text-sm">
                <th className="pb-3 font-medium">Scan Type</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Findings</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan) => (
                <tr key={scan.id} className="border-b border-dark-600/30 last:border-0 hover:bg-dark-700/30 transition-colors">
                  <td className="py-4 font-medium text-white">{scan.type}</td>
                  <td className="py-4 text-slate-400 text-sm">{scan.date}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-neon-green/10 text-neon-green border border-neon-green/20">
                      <CheckCircle2 className="w-3 h-3" />
                      {scan.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-neon-red font-bold">{scan.findings}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="All Recent Scans">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-dark-600/50 text-slate-400 text-sm">
                <th className="pb-3 font-medium">Scan Type</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Findings</th>
              </tr>
            </thead>
            <tbody>
              {allScans.map((scan) => (
                <tr key={scan.id} className="border-b border-dark-600/30 last:border-0 hover:bg-dark-700/30 transition-colors">
                  <td className="py-4 font-medium text-white">{scan.type}</td>
                  <td className="py-4 text-slate-400 text-sm">{scan.date}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-neon-green/10 text-neon-green border border-neon-green/20">
                      <CheckCircle2 className="w-3 h-3" />
                      {scan.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-neon-red font-bold">{scan.findings}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};
