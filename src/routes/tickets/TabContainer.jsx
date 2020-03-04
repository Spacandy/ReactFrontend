//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';

import Typography from '@material-ui/core/Typography';

type Props = {
  children: any,
};

export default function Item(props: Props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3, width: 350, margin: '0 auto' }}>
      {props.children}
    </Typography>
  );
}
