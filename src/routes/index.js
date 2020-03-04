/**
 *              ___             _   _  _ _
 *             | __|_ _____ _ _| |_| || (_)
 * Property of:| _|\ V / -_) ' \  _| __ | |
 *             |___|\_/\___|_||_\__|_||_|_|
 *
 */

/* eslint-disable global-require */
import React from 'react';
import Layout from 'components/Layout';
// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: '/about',
      load: () => import(/* webpackChunkName: 'about' */ './about'),
    },
    {
      path: '/account',
      children: [
        {
          path: '/profile',
          load: () =>
            import(/* webpackChunkName: 'accountProfile' */ './account/routes/profile'),
        },
        {
          path: '/change-password',
          load: () =>
            import(/* webpackChunkName: 'accountPassword' */ './account/routes/password'),
        },
        {
          path: '/billing',
          load: () =>
            import(/* webpackChunkName: 'accountBilling' */ './account/routes/billing'),
        },
      ],
    },
    {
      path: '/checkout',
      load: () => import(/* webpackChunkName: 'checkout' */ './checkout'),
    },
    {
      path: '/admin',
      load: () => import(/* webpackChunkName: 'admin' */ './admin'),
    },
    {
      path: '/browse',
      load: () => import(/* webpackChunkName: 'browse' */ './browse'),
    },
    {
      path: '/help',
      load: () => import(/* webpackChunkName: 'help' */ './help'),
    },
    {
      path: '/create',
      load: () => import(/* webpackChunkName: 'create' */ './create'),
    },
    {
      path: '/dashboard',
      children: [
        {
          path: '',
          load: () =>
            import(/* webpackChunkName: 'dashboard' */ './dashboard/routes/dashboard'),
        },
        {
          path: '/analytics',
          load: () =>
            import(/* webpackChunkName: 'dashboardAnalytics' */ './dashboard/routes/dashboardAnalyitcs'),
        },
        {
          path: '/edit',
          load: () =>
            import(/* webpackChunkName: 'dashboardEdit' */ './dashboard/routes/dashboardEdit'),
        },
        {
          path: '/refunds',
          load: () =>
            import(/* webpackChunkName: 'dashboardRefunds' */ './dashboard/routes/dashboardRefunds'),
        },
        {
          path: '/attendees',
          load: () =>
            import(/* webpackChunkName: 'dashboardCheckin' */ './dashboard/routes/dashboardCheckin'),
        },
        {
          path: '/sponsorships',
          load: () =>
            import(/* webpackChunkName: 'dashboardSponsorships' */ './dashboard/routes/dashboardSponsorships'),
        },
        {
          path: '/billing',
          load: () =>
            import(/* webpackChunkName: 'dashboardBilling' */ './dashboard/routes/dashboardBilling'),
        },
      ],
    },
    {
      path: '/email-validation',
      children: [
        {
          path: '/:validationKey',
          load: () =>
            import(/* webpackChunkName: 'emailValidation' */ './emailValidation/routes/emailValidation'),
        },
      ],
    },
    {
      path: '/error',
      load: () => import(/* webpackChunkName: 'error' */ './error'),
    },
    {
      path: '/event/:id',
      load: () => import(/* webpackChunkName: 'event' */ './event'),
    },
    {
      path: '/legal',
      children: [
        {
          path: '',
          load: () => import(/* webpackChunkName: 'legal' */ './legal'),
        },
        {
          path: '/terms-of-use',
          load: () =>
            import(/* webpackChunkName: 'terms-of-use' */ './legal/terms-of-use'),
        },
        {
          path: '/terms-of-services',
          load: () =>
            import(/* webpackChunkName: 'terms-of-services' */ './legal/terms-of-services'),
        },
        {
          path: '/merchant-policy',
          load: () =>
            import(/* webpackChunkName: 'merchant-policy' */ './legal/merchant-policy'),
        },
        {
          path: '/privacy-policy',
          load: () =>
            import(/* webpackChunkName: 'privacy-policy' */ './legal/privacy-policy'),
        },
      ],
    },
    {
      path: '/password/reset/:key',
      load: () => import(/* webpackChunkName: 'resetPassword' */ './password'),
    },
    {
      path: '/press',
      load: () => import(/* webpackChunkName: 'press' */ './press'),
    },
    {
      path: '/pricing',
      load: () => import(/* webpackChunkName: 'pricing' */ './pricing'),
    },
    // {
    //   path: '/profile',
    //   load: () => import(/* webpackChunkName: 'profile' */ './profile'),
    // },
    {
      path: 'support',
      load: () => import(/* webpackChunkName: 'support' */ './support'),
    },
    {
      path: '/tickets',
      load: () => import(/* webpackChunkName: 'tickets' */ './orders'),
    },
    {
      path: '/orders',
      load: () => import(/* webpackChunkName: 'tickets' */ './tickets'),
    },

    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    const route = await next();
    let menuOpen;
    let headerHidden = false;
    let footerHidden = false;
    let createShown = false;

    const checkIfCreate = (arrOfRoutes, currentRoute) =>
      arrOfRoutes.some(r => {
        createShown = r === currentRoute;
        return createShown;
      });
    const checkIfMenu = (arrOfRoutes, currentRoute) =>
      arrOfRoutes.some(routeWithMenu => {
        menuOpen = routeWithMenu === currentRoute;
        return menuOpen;
      });
    const checkIfHeaderHidden = (arrOfRoutes, currentRoute) =>
      arrOfRoutes.some(r => {
        headerHidden = r === currentRoute;
        return headerHidden;
      });
    const checkIfFooterHidden = (arrOfRoutes, currentRoute) =>
      arrOfRoutes.some(r => {
        footerHidden = r === currentRoute;
        return footerHidden;
      });
    const createChunks = [
      'home',
      'event',
      'tickets',
      'help',
      'pricing',
      'legal',
      'accountProfile',
      'accountPassword',
      'accountBilling',
      'dashboard',
      'dashboardRefunds',
      'dashboardBilling',
      'dashboardEdit',
      'dashboardAnalyitcs',
      'dashboardCheckin',
    ];
    const hiddenHeaderChunks = ['resetPassword', 'emailValidation', 'checkout'];
    const hiddenFooterChunks = ['resetPassword', 'emailValidation'];
    const chunksWithSidebar = [
      'accountProfile',
      'accountPassword',
      'accountBilling',
      'dashboard',
      'dashboardRefunds',
      'dashboardBilling',
      'dashboardEdit',
      'dashboardAnalyitcs',
      'dashboardCheckin',
    ];

    if (route.chunks) route.chunks.map(chunk => checkIfMenu(chunksWithSidebar, chunk));
    if (route.chunks)
      route.chunks.map(chunk => checkIfHeaderHidden(hiddenHeaderChunks, chunk));
    if (route.chunks)
      route.chunks.map(chunk => checkIfFooterHidden(hiddenFooterChunks, chunk));
    if (route.chunks) route.chunks.map(chunk => checkIfCreate(createChunks, chunk));

    route.title = `EventHi- ${route.title || 'Untitled Page'}`;
    route.description = route.description || '';
    route.component = (
      <Layout
        create={createShown}
        headerHidden={headerHidden}
        footerHidden={footerHidden}
        menu={menuOpen}
      >
        {route.component}
      </Layout>
    );

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
