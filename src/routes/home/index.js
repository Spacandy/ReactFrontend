//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Home from './Home';
import axios from 'axios';

async function action({ fetch }) {
  const resp = await axios.get(`https://be.eventhi.io/events/home?limit=12`);

  return {
    chunks: ['home'],
    title: 'Create an experience for the world to discover.',
    component: (
      <Home events={resp.data.results} pageCount={Math.ceil(resp.data.count / 12)} />
    ),
  };
}

export default action;
