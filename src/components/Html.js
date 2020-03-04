/**
 *              ___             _   _  _ _
 *             | __|_ _____ _ _| |_| || (_)
 * Property of:| _|\ V / -_) ' \  _| __ | |
 *             |___|\_/\___|_||_\__|_||_|_|
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import config from '../config';
import { isRelease } from 'settings';
/* eslint-disable react/no-danger */

class Html extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired,
      }).isRequired,
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
  };

  render() {
    const {
      title,
      description,
      styles,
      scripts,
      app,
      children,
      pathname,
      user,
    } = this.props;

    const htmlAttrs = this.props.helmet
      ? this.props.helmet.htmlAttributes.toComponent()
      : null;

    const bodyAttrs = this.props.helmet
      ? this.props.helmet.bodyAttributes.toComponent()
      : null;

    const siteMetadata = {
      '@context': `http://schema.org`,
      '@type': 'WebSite',
      name: 'EventHi',
      alternateName: 'EventHi Inc',
      url: `https://www.eventhi.io`,
    };

    const orgMetadata = {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      url: 'https://www.eventhi.io',
      logo: 'https://d3rd29nk50moi4.cloudfront.net/logo.png',
      sameAs: [
        'https://www.facebook.com/eventhi.io/',
        'https://twitter.com/eventhi_io',
        'https://www.instagram.com/eventhi.io/',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+1-619-738-5100',
          contactType: 'customer service',
        },
      ],
    };

    return (
      <html className="no-js" lang="en" {...htmlAttrs}>
        <head>
          <title>{title}</title>
          {isRelease &&
            config.analytics.googleTrackingId && [
              <script async src="https://www.google-analytics.com/analytics.js" />,
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                    ga('create', '${config.analytics.googleTrackingId}', 'auto');
                    ga('send', 'pageview');
                `,
                }}
              />,
            ]}
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link rel="icon" href="https://d3rd29nk50moi4.cloudfront.net/favicon.ico" />
          <meta property="og:type" content="website" />
          <meta
            name="google-site-verification"
            content="1fFYDzVjNyGe72fmU2FGIYkodNkQ1RJDS3kCx4heZ5Y"
          />
          <meta
            name="google-site-verification"
            content="HXmM7ufp2wc73faKuX47GiV2747UrUsJtJsSYPJXU7I"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {scripts.map(script => (
            <link key={script} rel="preload" href={script} as="script" />
          ))}
          {this.props.helmet ? this.props.helmet.meta.toComponent() : null}
          {this.props.helmet ? this.props.helmet.link.toComponent() : null}
          {this.props.helmet ? this.props.helmet.script.toComponent() : null}
          <link
            rel="apple-touch-icon"
            href="https://d3rd29nk50moi4.cloudfront.net/apple-touch-icon.png"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://d3rd29nk50moi4.cloudfront.net/snow.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/searchkit/2.0.0/theme.css"
          />
          <style id="jss-server-side">{this.props.css}</style>
          {styles.map(style => (
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          ))}
        </head>
        <body style={{ margin: 0, backgroundColor: '#fafafa' }} {...bodyAttrs}>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }} />
          {scripts.map(script => <script key={script} src={script} />)}
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQHgLhBpHbqa7h6hGHw6y1BKCGE-t6fLs&amp;libraries=places" />
        </body>
      </html>
    );
  }
}

export default Html;
