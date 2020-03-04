//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Svg from 'components/Svg';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

type PropsType = {
  eventId: number,
  user: string,
  token: string,
  mutate: Function,
  isFavorite: boolean,
};

type DefaultPropsType = {};

type StateType = {};

const styles = theme => ({
  button: {
    right: 6,
    top: 23,
    position: 'absolute',
  },
});

class FavoriteButton extends React.Component<DefaultPropsType, PropsType, StateType> {
  static defaultProps: DefaultPropsType;
  props: PropsType;
  state: StateType = {
    isFavorite: false,
  };

  componentDidMount() {}

  handleClick = () => {
    this.setState(prevState => {
      return { isFavorite: !prevState.isFavorite };
    });
    // const eventId = this.props.eventId;
    // const user = this.props.user;
    // const token = this.props.token;
    // console.log(
    //   'Handle click of favorite button. this.props.eventId: ',
    //   this.props.eventId,
    // );
    //
    // this.props
    //   .mutate({
    //     variables: {
    //       eventId: eventId,
    //       user: user,
    //       token: token,
    //     },
    //   })
    //   .then(({ data }) => {
    //     console.log('Event favoriteteteed');
    //   })
    //   .catch(error => {
    //     console.log('Event NOT favoriteted');
    //   });
    // // this.props.toggleFavorite();
    // // this.setState(prevState => {
    // //   return { isFavorite: !prevState.isFavorite };
    // // });
  };

  render() {
    return (
      <IconButton
        onClick={this.handleClick}
        className={this.props.classes.button}
        aria-label="Favorite"
      >
        {this.state.isFavorite ? (
          <Svg icon="FavoriteIcon" />
        ) : (
          <Svg icon="FavoriteBorder" />
        )}
      </IconButton>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.id,
  token: state.auth.token,
});

const toggleFavoriteMutation = gql`
  mutation($eventId: ID!, $user: Int, $token: String) {
    toggleFavorite(eventId: $eventId, user: $user, token: $token) {
      id
      __typename
      isFavorite
    }
  }
`;

export default compose(
  withStyles(styles),
  graphql(toggleFavoriteMutation),
  connect(mapStateToProps, null),
)(FavoriteButton);
