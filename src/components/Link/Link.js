//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow
import React from 'react';
import history from 'localHistory';

function isLeftClickEvent(event: Event) {
  return event.button === 0;
}

function isModifiedEvent(event: Event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

type Props = {
  onClick: Function | null,
  to: string,
  className: string | null,
  children: ?any,
};

type State = {};

class Link extends React.Component<Props, State> {
  state: State;
  props: Props;

  handleClick = (event: Event) => {
    if (this.props.onClick) this.props.onClick(event);

    // TODO: these any types are a copout. figure this out!!
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(this.props.to);
  };

  render() {
    const { to, children, className, ...props } = this.props;
    return (
      <a
        href={to}
        {...props}
        style={{ textDecoration: 'none', ...this.props.style }}
        className={className}
        onClick={this.handleClick}
      >
        {children}
      </a>
    );
  }
}

export default Link;
