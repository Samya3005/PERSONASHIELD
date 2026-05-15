export const dashboardData = {
  riskScore: 78,
  exposureLevel: "High",
  totalFindings: 142,
  recentScans: [
    { id: 1, date: "2026-05-14", type: "Deep Web Scan", status: "Completed", findings: 12 },
    { id: 2, date: "2026-05-10", type: "Social Media Footprint", status: "Completed", findings: 45 },
    { id: 3, date: "2026-05-01", type: "Data Broker Check", status: "Completed", findings: 85 },
  ],
  exposureCategories: [
    { name: "Social Media", value: 45 },
    { name: "Data Brokers", value: 65 },
    { name: "Dark Web", value: 12 },
    { name: "Public Records", value: 20 },
  ],
  threats: [
    { id: 101, category: "Data Leak", source: "LinkedIn Data Breach 2021", severity: "High", description: "Email and phone number found in public leak." },
    { id: 102, category: "Social Media", source: "Twitter/X", severity: "Medium", description: "Location tagging active on recent posts." },
    { id: 103, category: "Data Broker", source: "Whitepages", severity: "Low", description: "Home address and relatives listed publicly." },
  ],
  remediationTasks: [
    { id: 1, title: "Opt-out from Whitepages", completed: false, impact: "High" },
    { id: 2, title: "Change LinkedIn Password", completed: true, impact: "Critical" },
    { id: 3, title: "Disable location on Twitter", completed: false, impact: "Medium" },
  ]
};

export const chatHistory = [
  { id: 1, role: "ai", content: "Hello! I am PersonaShield AI. I can help you analyze your digital footprint and suggest ways to improve your online privacy. How can I assist you today?" },
  { id: 2, role: "user", content: "What does my risk score of 78 mean?" },
  { id: 3, role: "ai", content: "A risk score of 78 indicates a 'High' exposure level. This is primarily due to your information appearing in 3 data leaks and being accessible on several data broker websites. I recommend starting with the 'Privacy Remediation' checklist to lower your score." }
];
