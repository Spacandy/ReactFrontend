import React from 'react';
import Dashboard from '../Dashboard';
import DashboardCheckinSection from '../sections/DashboardCheckinSection';

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
    title: 'Dashboard - Checkin',
    chunks: ['dashboardCheckin'],
    component: (
      <Dashboard>
        <DashboardCheckinSection />
      </Dashboard>
    ),
  };
}
export default action;
