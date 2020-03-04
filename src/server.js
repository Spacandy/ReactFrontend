/**
 *              ___             _   _  _ _
 *             | __|_ _____ _ _| |_| || (_)
 * Property of:| _|\ V / -_) ' \  _| __ | |
 *             |___|\_/\___|_||_\__|_||_|_|
 *
 */

import path from 'path';
import Promise from 'bluebird';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { graphql } from 'graphql';
import expressGraphQL from 'express-graphql';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import PrettyError from 'pretty-error';

import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { Helmet } from 'react-helmet';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';
import { red } from '@material-ui/core/colors';

import { ApolloEngine } from 'apollo-engine';

import { isRelease } from 'settings';

import createApolloClient from './core/createApolloClient';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import router from './router';
import schema from './data/schema';
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import config from './config';
import * as Sentry from '@sentry/node';

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

Sentry.init({ dsn: process.env.SENTRY_SERVER_DSN });

const engine = new ApolloEngine({
  apiKey: 'service:kjg531-EventHi:Df0aPDEcPEs0J8SpyWqx6w',
});
const app = express();
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public'), { maxAge: 9897959483929 }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: 9999999 }));
app.use(bodyParser.json({ limit: 9999999 }));

// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars

  next(err);
});

//
// Register API middleware
// -----------------------------------------------------------------------------
// https://github.com/graphql/express-graphql#options
const graphqlMiddleware = expressGraphQL((req, res) => ({
  schema,
  graphiql: __DEV__,
  context: { req, res },
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack,
    path: error.path,
  }),
  rootValue: { request: req },
  pretty: __DEV__,
  tracing: true,
  cacheControl: true,
}));

app.use('/graphql', graphqlMiddleware);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    const apolloClient = createApolloClient({
      schema,
      rootValue: { request: req, res },
      fetch: nodeFetch,
    });

    const pickBaseUrl = () => {
      if (isRelease) {
        return config.app.appUrl;
      }
      return config.app.localUrl;
    };

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: pickBaseUrl(),
      cookie: req.headers.cookie,
      apolloClient,
      schema,
      graphql,
    });

    const initialState = {
      user: req.user || null,
    };

    const store = configureStore(initialState, {
      cookie: req.headers.cookie,
      fetch,
      // I should not use `history` on server.. but how I do redirection? follow universal-router
      history: null,
    });

    store.dispatch(
      setRuntimeVariable({
        name: 'initialNow',
        value: Date.now(),
      }),
    );

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
      // Apollo Client for use with react-apollo
      client: apolloClient,
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }
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
          contrastText: '#fff',
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
    const jss = create(preset());

    jss.options.createGenerateClassName = createGenerateClassName;

    const data = { ...route };
    const sheetsRegistry = new SheetsRegistry();

    const rootComponent = (
      <JssProvider registry={sheetsRegistry} jss={jss}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <App context={context} store={store}>
            {route.component}
          </App>
        </MuiThemeProvider>
      </JssProvider>
    );
    await getDataFromTree(rootComponent);
    // this is here because of Apollo redux APOLLO_QUERY_STOP action
    await Promise.delay(0);
    data.children = await ReactDOM.renderToString(rootComponent);
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

    const helmet = Helmet.renderStatic();

    const scripts = new Set();
    scripts.add('https://core.spreedly.com/iframe/iframe-v1.min.js');

    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);
    data.scripts = Array.from(scripts);

    // Furthermore invoked actions will be ignored, client will not receive them!
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Serializing store...');
    }
    data.app = {
      apiUrl: config.app.clientUrl,
      state: context.store.getState(),
      apolloState: context.client.extract(),
    };
    const cssSheet = sheetsRegistry.toString();
    const html = ReactDOM.renderToStaticMarkup(
      <Html
        pathname={req.originalUrl}
        user={data.app.state.auth.email}
        helmet={helmet}
        css={cssSheet}
        {...data}
      />,
    );

    res.status(route.status || 200);
    res.set('cache-control', 'max-age=9897959483929, no-transform');
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------

if (!module.hot) {
  engine.listen(
    {
      port: config.port,
      graphqlPaths: ['/graphql'],
      expressApp: app,
      launcherOptions: {
        startupTimeout: 3000,
      },
    },
    () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    },
  );
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
