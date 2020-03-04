//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import striptags from 'striptags';

type Event = {
  slug: string,
  name: string,
  description: string,
  image: string,
};

type Props = {
  event: Event,
  schema: {},
  mediaEndpoint: string,
};

const EventDetailsHelmet = (props: Props) => (
  <Helmet>
    <meta
      name="description"
      content={`${striptags(props.event.description.slice(0, 300))}`}
    />
    <meta property="og:title" content={`${props.event.name} • EventHi`} />
    <meta
      property="og:description"
      content={`${striptags(props.event.description.slice(0, 300))}`}
    />
    <meta property="og:image" content={`${props.mediaEndpoint}${props.event.image}`} />
    <meta
      property="og:image:secure_url"
      content={`${props.mediaEndpoint}${props.event.image}`}
    />
    <meta property="og:image:width" content={1200} />
    <meta property="og:image:height" content={628} />
    1200 x 628
    <meta
      property="og:url"
      content={`https://www.eventhi.io/event/${props.event.slug}`}
    />
    <script type="application/ld+json">{`${JSON.stringify(props.schema)}`}</script>
  </Helmet>
);

export default EventDetailsHelmet;
