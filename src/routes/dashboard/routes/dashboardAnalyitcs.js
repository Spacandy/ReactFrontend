import React from 'react';
import Dashboard from '../Dashboard';
import DashboardAnalyticsSection from '../sections/DashboardAnalyticsSection';

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
    title: 'Dashboard - Analytics',
    chunks: ['dashboardAnalytics'],
    component: (
      <Dashboard>
        <DashboardAnalyticsSection />
      </Dashboard>
    ),
  };
}
export default action;
