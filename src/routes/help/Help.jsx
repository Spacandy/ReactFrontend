/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable no-console */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import questions from './questions.json';

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
  },
  container: {
    margin: '50px auto',
    width: '80%',
    minWidth: '310px',
  },
  title: {
    position: 'relative',
    width: '100%',
    height: '150px',
    paddingTop: '80px',
    background:
      'linear-gradient(135deg, #facf94 0%,#ff7bb6 33%,#cd50ec 69%,#7dc9ff 100%)',

    '&>h1': {
      position: 'absolute',
      right: 0,
      bottom: '30px',
      left: 0,
      fontFamily: 'Roboto, Arial, sans-serif',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(36),
      color: '#fffffe',
      textAlign: 'center',
    },
  },
  category: {
    margin: '50px 0',
  },
  header: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: theme.typography.pxToRem(28),
    color: '#00aeef',
    fontWeight: '200',
  },
  question: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightRegular,
    color: 'rgb(68,68,68)',
  },
  answer: {
    fontWeight: theme.typography.fontWeightRegular,
    color: 'rgb(119,119,119)',
    paddingLeft: '15px',
    paddingRight: '20px',
  },
  test: {
    animation: 'MoveUpDown 1s linear infinite',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  '@keyframes MoveUpDown': {
    '0%': {
      bottom: 0,
    },
    '50%': {
      bottom: '5px',
    },
    '100%': {
      bottom: 0,
    },
  },
});

class Help extends React.Component<DefaultPropsType, PropsType, StateType> {
  handleClick = (question, id) => {
    console.log(question, id);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.title}>
          <h1
            style={{
              position: 'absolute',
              right: 0,
              bottom: '30px',
              left: 0,
              fontFamily: 'Roboto, Arial, sans-serif',
              color: '#fffffe',
              textAlign: 'center',
            }}
          >
            EventHi Help Center
          </h1>
        </div>
        <div className={classes.container}>
          <div className={classes.category}>
            <h1 className={classes.header}>General Questions</h1>
            {questions.general.map((question, id = question.id) => (
              <ExpansionPanel key={id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="black" />}>
                  <Typography className={classes.question}>{question.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography className={classes.answer}>{question.answer}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
          <div className={classes.category}>
            <h1 className={classes.header}>Hosting Events</h1>
            {questions.organizer.map((question, id = question.id) => (
              <ExpansionPanel key={id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="black" />}>
                  <Typography className={classes.question}>{question.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography className={classes.answer}>{question.answer}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
          <div className={classes.category}>
            <h1 className={classes.header}>Payouts and Orders</h1>
            {questions.pricing.map((question, id = question.id) => (
              <ExpansionPanel key={id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="black" />}>
                  <Typography className={classes.question}>{question.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography className={classes.answer}>{question.answer}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Help);
