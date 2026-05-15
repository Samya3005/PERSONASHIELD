import React from 'react';

export const SuggestedPrompts = ({ onSelect }) => {
  const prompts = [
    "What does my risk score of 78 mean?",
    "How can I remove my data from Whitepages?",
    "Summarize my recent social media exposures.",
    "Is my email in any recent data breaches?"
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {prompts.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onSelect(prompt)}
          className="text-xs px-3 py-2 rounded-full bg-dark-700 text-slate-300 hover:bg-neon-blue/20 hover:text-neon-blue border border-dark-600 hover:border-neon-blue/50 transition-colors"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};
