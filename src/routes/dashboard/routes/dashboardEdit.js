import React from 'react';
import Dashboard from '../Dashboard';
import DashboardEditSection from '../sections/DashboardEditSection';

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
    title: 'Dashboard - Edit',
    chunks: ['dashboardEdit'],
    component: (
      <Dashboard>
        <DashboardEditSection />
      </Dashboard>
    ),
  };
}
export default action;
