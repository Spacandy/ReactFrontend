import React from 'react';
import Dashboard from '../Dashboard';
import DashboardSponsorshipsSection from '../sections/DashboardSponsorshipsSection';

export function action({ store }) {
  return {
    title: 'Dashboard - Sponsorships',
    chunks: ['dashboardSponsorships'],
    component: (
      <Dashboard>
        <DashboardSponsorshipsSection />
      </Dashboard>
    ),
  };
}
export default action;
