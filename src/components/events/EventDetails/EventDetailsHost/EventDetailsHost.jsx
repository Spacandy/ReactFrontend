//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import { detailShareIcons } from 'settings';

const styles = () => ({
  avatar: {
    width: '120px',
    paddingRight: '50px',
    '&>div': {
      backgroundColor: '#424242',
      width: '120px',
      height: '120px',
      fontSize: '50px !important',
    },
  },
  profileWrapper: {
    display: 'flex',
    flexDirection: 'row',
    margin: '50px auto',
    minWidth: '320px',
    maxWidth: 'fit-content',
    fontFamily: 'Roboto',
    '&>div': {
      padding: '0 25px 0 0',
    },
  },
  hostSocialButtons: {
    display: 'flex',
    position: 'relative',
    width: '120px',
    bottom: '-5px',
    justifyContent: 'space-around',
    margin: '0 auto',
  },
  username: {
    zIndex: '1',
    padding: 0,
    '& strong:nth-child(1)': {
      margin: 0,
      fontSize: '0.9rem',
      fontWeight: 'bolder',
      color: '#757575',
    },
    '& p:nth-child(2)': {
      color: 'black',
      padding: '10px 0',
      margin: 0,
      fontWeight: 'bold',
      fontSize: '1.45rem',
    },
    '&>span': {
      color: '#757575',
      fontWeight: 'bold',
      margin: '15px 0',
    },
  },
  profileButtons: {
    height: '40px',
    margin: '45px 0 0 0',
    '& span': {
      fontSize: '12px !important',
      // color: 'white !important',
    },
  },
});

type Props = {
  event: Event,
  classes: {
    profileWrapper: {},
    avatar: {},
    hostSocialButtons: {},
    username: {},
    profileButtons: {},
  },
  handleContactClick: Function,
};

const EventDetailsHost = (props: Props) => (
  <div className={props.classes.profileWrapper}>
    <div
      style={{
        padding: '0 25px 0 0',
      }}
    >
      <div className={props.classes.avatar}>
        <Avatar
          style={{
            width: 120,
            height: 120,
            backgroundColor: 'black',
            fontSize: 50,
          }}
        >
          {props.event ? props.event.hostname[0].toUpperCase() : ''}
        </Avatar>
      </div>
      <div>
        {detailShareIcons ? (
          <div className={props.classes.hostSocialButtons}>
            {props.event.facebookUrl ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${props.event.facebookUrl}`}
              >
                <FacebookIcon size={24} round />
              </a>
            ) : null}
            {props.event.twitterUrl ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${props.event.twitterUrl}`}
              >
                <TwitterIcon size={24} round />
              </a>
            ) : null}
            {props.event.instagramUrl ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${props.event.instagramUrl}`}
              >
                <div style={{ height: 24, width: 24 }}>
                  <svg
                    style={{ transform: 'scale(1.51)' }}
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <linearGradient
                      gradientTransform="matrix(1 0 0 -1 0 50)"
                      gradientUnits="userSpaceOnUse"
                      id="a"
                      x1="24"
                      x2="24"
                      y1="8.717"
                      y2="43.88"
                    >
                      <stop offset="0.097" stopColor="#FFD879" />
                      <stop offset="0.154" stopColor="#FCCB76" />
                      <stop offset="0.258" stopColor="#F5AA6C" />
                      <stop offset="0.398" stopColor="#E9755E" />
                      <stop offset="0.449" stopColor="#E45F58" />
                      <stop offset="0.679" stopColor="#D22A9C" />
                      <stop offset="1" stopColor="#6968DF" />
                    </linearGradient>
                    <circle cx="24" cy="24" r="15.344" fill="url(#a)" />
                    <path
                      d="M24 27.715c-2.049 0-3.715-1.667-3.715-3.715S21.95 20.285 24 20.285 27.716 21.95 27.716 24 26.049 27.715 24 27.715zm0-6.43A2.718 2.718 0 0 0 21.285 24 2.719 2.719 0 0 0 24 26.715 2.72 2.72 0 0 0 26.716 24 2.718 2.718 0 0 0 24 21.285z"
                      fill="#FFF"
                    />
                    <circle cx="28.248" cy="19.891" r="0.462" fill="#FFF" />
                    <path
                      d="M27.198 31.264h-6.396a4.071 4.071 0 0 1-4.067-4.066v-6.396a4.071 4.071 0 0 1 4.067-4.067h6.396a4.071 4.071 0 0 1 4.067 4.067v6.396a4.071 4.071 0 0 1-4.067 4.066zm-6.396-13.529a3.07 3.07 0 0 0-3.067 3.067v6.396a3.07 3.07 0 0 0 3.067 3.066h6.396a3.07 3.07 0 0 0 3.067-3.066v-6.396a3.07 3.07 0 0 0-3.067-3.067h-6.396z"
                      fill="#FFF"
                    />
                  </svg>
                </div>
              </a>
            ) : null}

            {props.event.websiteUrl ? (
              <a target="_blank" rel="noopener noreferrer" href={props.event.websiteUrl}>
                <div style={{ height: 24, width: 24 }}>
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <g id="Style_2_copy_3">
                      <path
                        d="M16,0C7.163,0,0,7.163,0,16c0,8.836,7.163,16,16,16s16-7.164,16-16C32,7.163,24.837,0,16,0z"
                        fill="#333"
                      />
                      <g fill="#FFF">
                        <path d="M4.905,13.267l0.436,2.236c0.111,0.57,0.223,1.174,0.313,1.8h0.022c0.112-0.626,0.269-1.252,0.402-1.789 l0.582-2.247h1.342l0.547,2.18c0.146,0.615,0.291,1.23,0.403,1.856h0.022c0.078-0.626,0.19-1.241,0.313-1.867l0.47-2.169h1.666 l-1.678,5.467H8.147L7.632,16.81c-0.134-0.537-0.235-1.029-0.346-1.699H7.264c-0.101,0.682-0.212,1.185-0.358,1.699l-0.548,1.923 H4.76l-1.588-5.467H4.905z" />
                        <path d="M13.608,13.267l0.436,2.236c0.111,0.57,0.223,1.174,0.313,1.8h0.022c0.112-0.626,0.269-1.252,0.402-1.789 l0.582-2.247h1.342l0.547,2.18c0.146,0.615,0.291,1.23,0.403,1.856h0.022c0.078-0.626,0.19-1.241,0.313-1.867l0.47-2.169h1.666 l-1.678,5.467h-1.598l-0.514-1.923c-0.134-0.537-0.235-1.029-0.346-1.699h-0.023c-0.101,0.682-0.212,1.185-0.358,1.699 l-0.548,1.923h-1.598l-1.588-5.467H13.608z" />
                        <path d="M22.31,13.267l0.436,2.236c0.111,0.57,0.223,1.174,0.313,1.8h0.022c0.112-0.626,0.269-1.252,0.402-1.789 l0.582-2.247h1.342l0.547,2.18c0.146,0.615,0.291,1.23,0.403,1.856h0.022c0.078-0.626,0.19-1.241,0.313-1.867l0.47-2.169h1.666 l-1.678,5.467h-1.598l-0.514-1.923c-0.134-0.537-0.235-1.029-0.346-1.699h-0.023c-0.101,0.682-0.212,1.185-0.358,1.699 l-0.548,1.923h-1.598l-1.588-5.467H22.31z" />
                      </g>
                    </g>
                  </svg>
                </div>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
    <div className={props.classes.username}>
      <strong>HOSTED BY</strong>
      <p>{props.event.hostname}</p>
      {/* TODO: Ask samir what this is */}
      <h1>{props.event.private}</h1>

      <div className={props.classes.profileButtons}>
        <Button color="primary" variant="raised" onClick={props.handleContactClick}>
          Contact
        </Button>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(EventDetailsHost);
