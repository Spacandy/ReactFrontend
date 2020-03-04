//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

type PropsType = {
  size: number,
};

type StateType = {
  color: string,
};

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});
class Progress extends React.Component {
  props: PropsType;
  state: StateType = {
    color: '#00aeef',
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    if (this.state.color == '#00aeef') {
      this.setState({ color: '#00aeef' });
    } else {
      this.setState({ color: '#00aeef' });
    }
  };

  render() {
    const style = {
      container: {
        position: 'relative',
      },
      refresh: {
        display: 'inline-block',
        position: 'relative',
      },
    };
    return (
      <div style={style.container}>
        <CircularProgress
          className={this.props.classes.progress || null}
          size={this.props.size || 200}
          style={{ color: this.state.color }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Progress);
