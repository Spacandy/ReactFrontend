/**
 *              ___             _   _  _ _
 *             | __|_ _____ _ _| |_| || (_)
 * Property of:| _|\ V / -_) ' \  _| __ | |
 *             |___|\_/\___|_||_\__|_||_|_|
 *
 */

import React from 'react';
import ErrorPage from './ErrorPage';

function action() {
  return {
    title: 'Error',
    chunks: ['error'],
    component: <ErrorPage />,
  };
}

export default action;
