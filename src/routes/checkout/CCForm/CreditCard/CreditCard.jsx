import React from 'react';
import classNames from 'classnames';
import Payment from 'payment';
import theme from './CreditCard.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class ReactCreditCards extends React.Component {
  static defaultProps = {
    acceptedCards: [],
    locale: {
      valid: 'valid thru',
    },
    placeholders: {
      name: 'YOUR NAME HERE',
    },
    preview: true,
  };
  state = {
    type: {
      name: 'unknown',
      maxLength: 16,
    },
  };

  componentDidMount() {
    const { number } = this.props;
    this.setCards();
    this.updateType(this.props.issuer, this.props.isValidNumber);
  }

  static getDerivedStateFromProps(nextProps) {
    const { acceptedCards, number } = nextProps;

    const { acceptedCards: nextAcceptedCards, number: nextNumber } = nextProps;

    if (number !== nextNumber) {
      this.updateType(nextProps.issuer, nextProps.isValidNumber);
    }

    if (acceptedCards.toString() !== nextAcceptedCards.toString()) {
      this.setCards(nextProps);
    }
    return {};
  }

  get issuer() {
    const { type } = this.state;
    const { issuer, preview } = this.props;

    return preview && issuer ? issuer.toLowerCase() : type.issuer;
  }

  get number() {
    const { type } = this.state;
    const { number, preview } = this.props;

    let maxLength = preview ? 19 : type.maxLength;
    let nextNumber =
      typeof number === 'number' ? number.toString() : number.replace(/[A-Za-z]| /g, '');

    // if (isNaN(parseInt(nextNumber, 10)) && !preview) {
    //   nextNumber = '';
    // }

    if (maxLength > 16) {
      maxLength = nextNumber.length <= 16 ? 16 : maxLength;
    }

    if (nextNumber.length > maxLength) {
      nextNumber = nextNumber.slice(0, maxLength);
    }

    while (nextNumber.length < maxLength) {
      nextNumber += '•';
    }

    if (['amex', 'dinersclub'].includes(this.issuer)) {
      const format = [0, 4, 10];
      const limit = [4, 6, 5];
      nextNumber = `${nextNumber.substr(format[0], limit[0])} ${nextNumber.substr(
        format[1],
        limit[1],
      )} ${nextNumber.substr(format[2], limit[2])}`;
    } else if (nextNumber.length > 16) {
      const format = [0, 4, 8, 12];
      const limit = [4, 7];
      nextNumber = `${nextNumber.substr(format[0], limit[0])} ${nextNumber.substr(
        format[1],
        limit[0],
      )} ${nextNumber.substr(format[2], limit[0])} ${nextNumber.substr(
        format[3],
        limit[1],
      )}`;
    } else {
      for (let i = 1; i < maxLength / 4; i++) {
        const space_index = i * 4 + (i - 1);
        nextNumber = `${nextNumber.slice(0, space_index)} ${nextNumber.slice(
          space_index,
        )}`;
      }
    }

    return nextNumber;
  }

  get expiry() {
    const { expiry = '' } = this.props;
    const date = typeof expiry === 'number' ? expiry.toString() : expiry;
    let month = '';
    let year = '';

    if (date.includes('/')) {
      [month, year] = date.split('/');
    } else if (date.length) {
      month = date.substr(0, 2);
      year = date.substr(2, 6);
    }

    while (month.length < 2) {
      month += '•';
    }

    if (year.length > 2) {
      year = year.substr(2, 4);
    }

    while (year.length < 2) {
      year += '•';
    }

    return `${month}/${year}`;
  }

  setCards(props = this.props) {
    const { acceptedCards } = props;
    let newCardArray = [];

    if (acceptedCards.length) {
      Payment.getCardArray().forEach(d => {
        if (acceptedCards.includes(d.type)) {
          newCardArray.push(d);
        }
      });
    } else {
      newCardArray = newCardArray.concat(Payment.getCardArray());
    }

    Payment.setCardArray(newCardArray);
  }

  updateType(inputType, isValid) {
    const { callback } = this.props;
    const type = inputType || 'unknown';

    let maxLength = 16;

    if (type === 'amex') {
      maxLength = 15;
    } else if (type === 'dinersclub') {
      maxLength = 14;
    } else if (['hipercard', 'mastercard', 'visa'].includes(type)) {
      maxLength = 19;
    }

    const typeState = {
      issuer: type,
      maxLength,
    };

    this.setState({
      type,
    });

    if (typeof callback === 'function') {
      callback(typeState, isValid);
    }
  }

  render() {
    const { cvc, focused, locale, name, placeholders } = this.props;
    const { number, expiry, issuer } = this;
    const issuerClass = `rccs__card__${issuer}`;
    return (
      <div key="Cards" className={theme.rccs}>
        <div
          className={classNames(
            theme.rccs__card,
            issuer ? theme[issuerClass] : null,
            focused === 'cvc' && issuer !== 'amex' ? theme['rccs__card--flipped'] : '',
          )}
        >
          <div className={theme['rccs__card--front']}>
            <div className={theme['rccs__card__background']} />
            <div className={theme['rccs__issuer']} />
            <div
              className={classNames(
                theme['rccs__cvc__front'],
                focused === 'cvc' ? theme['rccs--focused'] : '',
              )}
            >
              {cvc}
            </div>
            <div
              className={classNames(
                theme['rccs__number'],
                number.replace(/ /g, '').length > 16 ? theme['rccs__number--large'] : '',
                focused === 'number' ? theme['rccs--focused'] : '',
                number.substr(0, 1) !== '•' ? theme['rccs--filled'] : '',
              )}
            >
              {number}
            </div>
            <div
              className={classNames(
                theme['rccs__name'],
                focused === 'name' ? theme['rccs--focused'] : '',
                name ? theme['rccs--filled'] : '',
              )}
            >
              {name || placeholders.name}
            </div>
            <div
              className={classNames(
                theme['rccs__expiry'],
                focused === 'expiry' ? theme['rccs--focused'] : '',
                expiry.substr(0, 1) !== '•' ? theme['rccs--filled'] : '',
              )}
            >
              <div className={theme['rccs__expiry__valid']}>{locale.valid}</div>
              <div className={theme['rccs__expiry__value']}>{expiry}</div>
            </div>
            <div className={theme['rccs__chip']} />
          </div>
          <div className={theme['rccs__card--back']}>
            <div className={theme['rccs__card__background']} />
            <div className={theme['rccs__stripe']} />
            <div className={theme['rccs__signature']} />
            <div
              className={classNames(
                theme['rccs__cvc'],
                focused === 'cvc' ? theme['rccs--focused'] : '',
              )}
            >
              {cvc}
            </div>
            <div className={theme['rccs__issuer']} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(theme)(ReactCreditCards);
