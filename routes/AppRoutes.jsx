import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingLayout } from '../layouts/LandingLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { MainLayout } from '../layouts/MainLayout';

import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { Dashboard } from '../pages/Dashboard';
import { ThreatReport } from '../pages/ThreatReport';
import { AIChatbot } from '../pages/AIChatbot';
import { PrivacyRemediation } from '../pages/PrivacyRemediation';
import { Settings } from '../pages/Settings';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="threats" element={<ThreatReport />} />
        <Route path="chatbot" element={<AIChatbot />} />
        <Route path="remediation" element={<PrivacyRemediation />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
