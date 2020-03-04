/**
 *              ___             _   _  _ _
 *             | __|_ _____ _ _| |_| || (_)
 * Property of:| _|\ V / -_) ' \  _| __ | |
 *             |___|\_/\___|_||_\__|_||_|_|
 *
 */

import React from 'react';
import Legal from './Legal';

const title = 'Legal';

function action() {
  return {
    chunks: ['legal'],
    title,
    component: <Legal title={title} />,
  };
}

export default action;
