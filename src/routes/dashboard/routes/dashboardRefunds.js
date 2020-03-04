import React from 'react';
import Dashboard from '../Dashboard';
import DashboardRefundsSection from '../sections/DashboardRefundsSection';

export function action({ store }) {
  // if (store) {
  //   console.log('we have a store');
  //   if (!store.getState().auth) {
  //     console.log('Trying to redirect');
  //     return { redirect: '/' };
  //   } else {
  //     console.log('no store');
  //   }
  // }
  return {
    title: 'Dashboard - Refunds',
    chunks: ['dashboardRefunds'],
    component: (
      <Dashboard>
        <DashboardRefundsSection />
      </Dashboard>
    ),
  };
}
export default action;
