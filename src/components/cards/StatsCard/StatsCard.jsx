import React from 'react';
import history from 'localHistory';
import Svg from 'components/Svg';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import statsCardStyle from './statsCardStyle';

const StatsCard = ({ ...props }) => {
  const {
    classes,
    title,
    description,
    statLink,
    small,
    statText,
    statIconColor,
    iconColor,
  } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: classes.cardHeader + ' ' + classes[iconColor + 'CardHeader'],
          avatar: classes.cardAvatar,
        }}
        avatar={
          <Svg
            icon={props.icon}
            style={{
              width: '40px',
              height: '36px',
              fill: '#fff',
            }}
          />
        }
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.cardCategory}>
          {title}
        </Typography>
        <Typography variant="headline" component="h2" className={classes.cardTitle}>
          {description}{' '}
          {small !== undefined ? (
            <small className={classes.cardTitleSmall}>{small}</small>
          ) : null}
        </Typography>
        {props.visualAid || null}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.cardStats}>
          {statLink !== undefined ? (
            <a
              onClick={() =>
                props.statLink.publishAction && !props.published
                  ? props.statLink.publishAction(props.eventId)
                  : history.push(statLink.url)
              }
              className={classes.cardStatsLink}
              style={{ color: props.statIconColor || '#424242', cursor: 'pointer' }}
            >
              <Svg
                icon={props.statIcon}
                style={{
                  position: 'relative',
                  top: '4px',
                  width: '16px',
                  height: '16px',
                  color: props.statIconColor,
                  marginRight: 5,
                }}
              />
              {statLink.text}
            </a>
          ) : statText !== undefined ? (
            statText
          ) : null}
        </div>
      </CardActions>
    </Card>
  );
};

export default withStyles(statsCardStyle)(StatsCard);
