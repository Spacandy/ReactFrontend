/**
 *              ___             _   _  _ _
 *             | __|_ _____ _ _| |_| || (_)
 * Property of:| _|\ V / -_) ' \  _| __ | |
 *             |___|\_/\___|_||_\__|_||_|_|
 *
 */

import 'whatwg-fetch';
import React from 'react';
import { hydrate, render } from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';
import queryString from 'query-string';
import history, { createPath } from 'localHistory';
import App from './components/App';
import createFetch from './createFetch';
import configureStore from './store/configureStore';
import { updateMeta } from './DOMUtils';
import createApolloClient from './core/createApolloClient';
import router from './router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { isRelease } from 'settings';
import * as Sentry from '@sentry/browser';

// Universal HTTP client
const fetch = createFetch(window.fetch, {
  baseUrl: window.App.apiUrl,
});

const apolloClient = createApolloClient();

// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
  // For react-apollo
  client: apolloClient,
  // Initialize a new Redux store
  // http://redux.js.org/docs/basics/UsageWithReact.html
  store: configureStore(window.App.state, { fetch, history }),
  fetch,
  storeSubscription: null,
};

Sentry.init({
  dsn: process.env.SENTRY_CLIENT_DSN,
  environment: process.env.APP_ENVIRONMENT,
  release: process.env.APP_VERSION,
  integrations: [new Sentry.Integrations.RewriteFrames()],
});

Sentry.configureScope(scope => {
  scope.setUser({
    id: context.store.getState().auth.id,
    username: `${context.store.getState().auth.firstName} ${
      context.store.getState().auth.lastName
    }`,
    email: context.store.getState().auth.email,
  });
});

const container = document.getElementById('app');
let currentLocation = history.location;
let appInstance;

const scrollPositionsHistory = {};

// Re-render the app when window.location changes
async function onLocationChange(location, action) {
  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };
  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }
  currentLocation = location;

  const isInitialRender = !action;
  try {
    context.pathname = location.pathname;
    context.query = queryString.parse(location.search);

    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve(context);

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    const renderReactApp = isInitialRender ? hydrate : render;

    const theme = createMuiTheme({
      palette: {
        primary: {
          light: '#00aeef',
          main: '#00aeef',
          dark: '#00aeef',
          contrastText: '#fff',
        },
        secondary: {
          light: '#00aeef',
          main: '#00aeef',
          dark: '#00aeef',
          contrastText: '#000',
        },
      },
      typography: {
        fontFamily: 'Roboto',
        fontWeightLight: 300,
        fontWeightRegular: 300,
        fontWeightMedium: 300,
      },
      overrides: {
        MuiAppBar: {
          root: {
            height: 64,
            width: '100%',
          },
          colorPrimary: {
            backgroundColor: '#fff',
          },
        },
      },
    });

    appInstance = renderReactApp(
      <MuiThemeProvider theme={theme}>
        <App context={context}>{route.component}</App>
      </MuiThemeProvider>,
      container,
      () => {
        if (isInitialRender) {
          // Switch off the native scroll restoration behavior and handle it manually
          // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
          if (window.history && 'scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
          }

          const elem = document.getElementById('css');
          if (elem) elem.parentNode.removeChild(elem);
          return;
        }

        document.title = route.title;

        updateMeta('description', route.description);
        // Update necessary tags in <head> at runtime here, ie:
        // updateMeta('keywords', route.keywords);
        // updateCustomMeta('og:url', route.canonicalUrl);
        // updateCustomMeta('og:image', route.imageUrl);
        // updateLink('canonical', route.canonicalUrl);
        // etc.

        let scrollX = 0;
        let scrollY = 0;
        const pos = scrollPositionsHistory[location.key];
        if (pos) {
          scrollX = pos.scrollX;
          scrollY = pos.scrollY;
        } else {
          const targetHash = location.hash.substr(1);
          if (targetHash) {
            const target = document.getElementById(targetHash);
            if (target) {
              scrollY = window.pageYOffset + target.getBoundingClientRect().top;
            }
          }
        }

        // Restore the scroll position if it was saved into the state
        // or scroll to the given #hash anchor
        // or scroll to top of the page
        window.scrollTo(scrollX, scrollY);

        // Google Analytics tracking. Don't send 'pageview' event after
        // the initial rendering, as it was already sent
        if (isRelease && window.ga) {
          window.ga('send', 'pageview', createPath(location));
        }
      },
    );
  } catch (error) {
    if (__DEV__) {
      throw error;
    }

    console.error(error);

    // Do a full page reload if error occurs during client-side navigation
    if (!isInitialRender && currentLocation.key === location.key) {
      console.error('EventHi will reload your page after error');
      window.location.reload();
    }
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange);
onLocationChange(currentLocation);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./router', () => {
    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      // Force-update the whole tree, including components that refuse to update
      deepForceUpdate(appInstance);
    }

    onLocationChange(currentLocation);
  });
}
