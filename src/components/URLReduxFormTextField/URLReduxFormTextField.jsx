//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const styles = () => ({
  protocol: {
    paddingRight: 0,
    width: 70,
    overflow: 'hidden',
    minHeight: '1.1875em',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '0.875rem',
    lineHeight: '1.46429em',
    color: 'rgba(0, 0, 0, 0.54)',
  },
});

type Props = {
  fieldName: string,
  label: string,
  change: Function,
};

type State = {
  url: string,
  protocol: string,
};

class URLReduxFormTextField extends Component<Props, State> {
  state: State = {
    url: '',
    protocol: 'https://',
  };
  props: Props;

  UNSAFE_componentWillMount = () => {
    if (this.props.initialValues)
      this.props.change(this.props.fieldName, this.props.initialValues);
    this.setState({ url: this.props.initialValues });
  };

  handleChangeProtocol = event => {
    this.props.change(this.props.fieldName, `${event.target.value}${this.state.url}`);
    this.setState({ protocol: event.target.value });
  };

  handleUrlChange = event => {
    let urlWithoutProtocol;
    let urlWithoutSpace;
    if (event && event.target.value === '') {
      urlWithoutProtocol = event.target.value.replace(/^https?\:\/\//i, '');
      urlWithoutSpace = urlWithoutProtocol.replace(/\s/g, '');
      this.setState({
        url: urlWithoutSpace,
        protocol: 'https://',
      });
      return this.props.change(this.props.fieldName, '');
    }
    if (event && event.target.value.startsWith('http://')) {
      urlWithoutProtocol = event.target.value.replace(/^https?\:\/\//i, '');
      urlWithoutSpace = urlWithoutProtocol.replace(/\s/g, '');
      this.props.change(this.props.fieldName, event.target.value);
      this.setState({
        url: urlWithoutSpace,
        protocol: 'http://',
      });
    }
    if (event && event.target.value.startsWith('https://')) {
      urlWithoutProtocol = event.target.value.replace(/^https?\:\/\//i, '');
      urlWithoutSpace = urlWithoutProtocol.replace(/\s/g, '');
      this.props.change(this.props.fieldName, event.target.value);
      this.setState({
        url: urlWithoutSpace,
        protocol: 'https://',
      });
    }
    urlWithoutProtocol = event.target.value.replace(/^https?\:\/\//i, '');
    urlWithoutSpace = urlWithoutProtocol.replace(/\s/g, '');
    this.props.change(this.props.fieldName, `${this.state.protocol}${urlWithoutSpace}`);
    return this.setState({
      url: urlWithoutSpace,
    });
  };

  render() {
    return (
      <FormControl fullWidth error={this.props.error}>
        <InputLabel
          required={this.props.required || false}
          htmlFor={this.props.fieldName}
        >
          {this.props.label}
        </InputLabel>
        <Input
          id={this.props.fieldName}
          value={this.state.url}
          onBlur={this.props.onBlur ? this.props.onBlur : null}
          onChange={this.handleUrlChange}
          startAdornment={
            <InputAdornment position="start">
              <Select
                onChange={this.handleChangeProtocol}
                value={this.state.protocol}
                disableUnderline
                classes={{ select: this.props.classes.protocol }}
              >
                <MenuItem value="https://">https://</MenuItem>
                <MenuItem value="http://">http://</MenuItem>
              </Select>
            </InputAdornment>
          }
        />
        {this.props.error ? (
          <FormHelperText htmlFor="render-error" error>
            {this.props.error}
          </FormHelperText>
        ) : null}
      </FormControl>
    );
  }
}

export default withStyles(styles)(URLReduxFormTextField);
