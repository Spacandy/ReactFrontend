//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import LazyLoad from 'react-lazyload';

import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles as MUIStyles } from '@material-ui/core/styles';

import Svg from 'components/Svg';
import Link from 'components/Link';
import ShareButton from 'components/buttons/ShareButton';

import { setPurchaseTicketModalState } from 'actions/modals/purchaseTicketsModal';

import { mediaEndpoint } from 'data/endpoints';

import formatDateLong from 'helpers/dates/formatDateLong';

type PropsType = {
  id: string,
  image: string,
  name: string,
  location: string,
  tickets: {},
};
type StateType = {
  shareOpen: boolean,
};
type DefaultPropsType = {};

const styles = () => ({
  tooltip: {
    top: '-15px !important',
  },
  card: {
    width: 278,
    margin: '0 auto 40px',
    '&:hover': {
      boxShadow:
        '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    },
  },
  typographyRoot: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  eventLink: {
    '& div': {
      '&:first-child': {
        height: 139,
      },
    },
  },
  cardContentRoot: {
    padding: '0px 0px 0px 0px !important',
  },
  cardActionsRoot: {
    justifyContent: 'space-between',
    paddingTop: '0 !important',
  },
  price: {
    width: 65,
    height: '30px !important',
    backgroundColor: '#212121',
    float: 'right',
    marginTop: -30,
    opacity: 0.93,
    color: 'white',
  },
  priceText: {
    marginTop: 4,
    textAlign: 'center',
    color: 'white',
    fontSize: '.9rem',
  },
});

class EventBox extends React.Component<DefaultPropsType, PropsType, StateType> {
  state: StateType = {
    shareOpen: false,
  };
  props: PropsType;

  handleBuyClick = () => {
    const { setPurchaseTicketModalState, id, tickets, timezone } = this.props;
    setPurchaseTicketModalState(true, id, tickets, timezone);
  };

  render() {
    let { classes, timezone, schedule, search = false } = this.props;
    console.log('xxxzzzz', this.props.schedule);
    return (
      <Card className={classes.card}>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <Link className={classes.eventLink} to={`/event/${this.props.slug}`}>
            <LazyLoad height={139}>
              <CardMedia
                image={
                  search ? `${this.props.image}` : `${mediaEndpoint}${this.props.image}`
                }
                title={this.props.name}
              />
            </LazyLoad>
            <div className={classes.price}>
              <Typography
                classes={{ root: classes.priceText }}
                variant="subheading"
                gutterBottom
              >
                {this.props.lowestTicketPrice}
              </Typography>
            </div>
            <div style={{ marginLeft: 4, paddingBottom: 8 }}>
              <Typography
                classes={{ root: classes.typographyRoot }}
                style={{ fontWeight: 900 }}
                component="p"
              >
                <Svg
                  icon="Store"
                  color="#424242"
                  style={{
                    marginBottom: -7,
                    marginTop: 7,
                    paddingRight: 7,
                  }}
                />
                {this.props.name}
              </Typography>
              <Typography classes={{ root: classes.typographyRoot }} component="p">
                <Svg
                  icon="Location"
                  color="#424242"
                  style={{
                    marginBottom: -7,
                    marginTop: 7,
                    paddingRight: 7,
                  }}
                />
                {this.props.location}
              </Typography>
              <Typography classes={{ root: classes.typographyRoot }} component="p">
                <Svg
                  icon="Date"
                  color="#424242"
                  style={{
                    marginBottom: -7,
                    marginTop: 7,
                    paddingRight: 7,
                  }}
                />
                {formatDateLong(schedule, timezone)}
              </Typography>
            </div>
          </Link>
        </CardContent>
        {search ? (
          <CardActions disableActionSpacing classes={{ root: classes.cardActionsRoot }}>
            <ShareButton
              shareOpen={this.state.shareOpen}
              shareClick={this.handleShareButtonClick}
              slug={this.props.slug}
              name={this.props.name}
              schedule={this.props.schedule}
            />
            <Tooltip
              classes={{ popper: classes.tooltip }}
              id="purchase-tooltip"
              title="Buy"
              placement="bottom"
            >
              <IconButton onClick={this.handleBuyClick} aria-label="Buy">
                <Svg color="#424242" icon="Cart" />
              </IconButton>
            </Tooltip>
          </CardActions>
        ) : null}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  setPurchaseTicketModalState: (state, eventId, tickets, timezone) => {
    dispatch(setPurchaseTicketModalState(state, eventId, tickets, timezone));
  },
});

export default compose(
  MUIStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EventBox);
