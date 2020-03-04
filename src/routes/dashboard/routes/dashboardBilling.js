import React from 'react';
import Dashboard from '../Dashboard';
import DashboardBillingSection from '../sections/DashboardBillingSection';

export function action() {
  return {
    title: 'Dashboard - Billing',
    chunks: ['dashboardBilling'],
    component: (
      <Dashboard>
        <DashboardBillingSection />
      </Dashboard>
    ),
  };
}
export default action;
