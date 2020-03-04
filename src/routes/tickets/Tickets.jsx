//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import { graphql, compose, withApollo } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Svg from 'components/Svg';
import SvgIcon from '@material-ui/core/SvgIcon';

import TicketItem from './TicketItem';
import TabContainer from './TabContainer';

import purchasedTicketsPastQuery from './purchasedTicketsPast.graphql';
import purchasedTicketsUpcomingQuery from './purchasedTicketsUpcoming.graphql';

type Props = {
  data: {},
  client: {},
};

type State = {};

function UpcommingIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill={props.color}
        d={`M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z`}
      />
    </SvgIcon>
  );
}

function PastIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill={props.color}
        d={`M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M16.53,11.06L15.47,10L10.59,14.88L8.47,12.76L7.41,13.82L10.59,17L16.53,11.06Z`}
      />
    </SvgIcon>
  );
}

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '95%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class Tickets extends React.Component<Props, State> {
  state: State = {
    pastEventsLoaded: false,
    purchasedTicketsPast: [],
    value: 0,
    expanded: 0,
  };

  UNSAFE_componentWillMount = () => {
    if (this.state.pastEventsLoaded) return;

    this.props.client
      .query({
        query: purchasedTicketsPastQuery,
        fetchPolicy: 'network-only',
      })
      .then(response => {
        this.setState({
          purchasedTicketsPast: response.data.purchasedTicketsPast,
          pastEventsLoaded: true,
        });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  props: Props;

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <div style={{ flex: 1 }}>
        <Paper style={{ width: 350, margin: '80px auto 0' }}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            fullWidth
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              icon={
                <UpcommingIcon
                  color={this.state.value === 0 ? '#00aeef' : 'rgba(0, 0, 0, 0.54)'}
                />
              }
              label="Upcoming"
            />
            <Tab
              icon={
                <PastIcon
                  color={this.state.value === 1 ? '#00aeef' : 'rgba(0, 0, 0, 0.54)'}
                />
              }
              label="Past"
            />
          </Tabs>
        </Paper>
        {this.state.value === 0 && (
          <TabContainer>
            {(this.props.data.purchasedTicketsUpcoming || []).map((ticket, index) => (
              <TicketItem
                expanded={expanded === index}
                index={index}
                onChange={this.handleExpand(index)}
                ticket={ticket}
                classes={classes}
                icon={ticket.type == 'ticket' ? 'Ticket' : 'Store'}
              />
            ))}
          </TabContainer>
        )}
        {this.state.value === 1 && (
          <TabContainer>
            {(this.state.purchasedTicketsPast || []).map((ticket, index) => (
              <TicketItem
                expanded={expanded === index}
                index={index}
                onChange={this.handleExpand(index)}
                ticket={ticket}
                classes={classes}
                icon={ticket.type == 'ticket' ? 'Ticket' : 'Store'}
              />
            ))}
          </TabContainer>
        )}
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  graphql(purchasedTicketsUpcomingQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
  withApollo,
)(Tickets);
