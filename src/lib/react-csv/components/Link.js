import React from 'react';
import { compose, withApollo } from 'react-apollo';
import Button from '@material-ui/core/Button';
import soldTicketsQuery from 'components/dashboard/CheckInTable/queries/soldTickets.graphql';

import { buildURI, toCSV } from '../core';
import {
  defaultProps as commonDefaultProps,
  propTypes as commonPropTypes,
} from '../metaProps';

const queryPrarmsGenerartor = (sorting, pageSize, currentPage) => {
  const columnSorting = sorting[0];
  let queryPrarmsString = `?limit=${pageSize}&offset=${pageSize * currentPage}`;

  if (columnSorting) {
    const sortingDirectionString = columnSorting.direction === 'desc' ? '-' : '';
    queryPrarmsString = `${queryPrarmsString}&ordering=${sortingDirectionString}${
      columnSorting.columnName
    }`;
  }

  return queryPrarmsString;
};

class CSVLink extends React.Component {
  static propTypes = commonPropTypes;
  static defaultProps = commonDefaultProps;

  constructor(props) {
    super(props);
    this.state = {
      downloadData: [],
    };
    this.buildURI = this.buildURI.bind(this);
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (nextState.shouldDownload) this.loadData(nextProps.eventId);
  };

  compareValues = (key, order = 'asc') => {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order == 'desc' ? comparison * -1 : comparison;
    };
  };

  processDataForDownload = tickets => {
    let processedData = [];
    if (tickets)
      tickets.map(t => {
        var p = this.transformFreePrice(t.price);
        processedData.push({
          checked: '',
          guest: t.guest,
          email: t.email,
          type: t.name,
          price: p,
        });
      });
    processedData.sort(this.compareValues('guest'));
    return processedData;
  };

  transformFreePrice = price => {
    if (price === 'free') {
      return '$0.00';
    }
    return `$${Number(price).toFixed(2)}`;
  };

  loadData = eventId => {
    const prarmsString = queryPrarmsGenerartor([], 99999, 0);

    this.props.client
      .query({
        query: soldTicketsQuery,
        variables: { eventId, queryParams: prarmsString },
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        this.setState({
          downloadData: this.processDataForDownload(data.transactionItems.results),
          shouldDownload: false,
        });
      })
      .catch(() => this.setState({ loading: false }));
  };

  buildURI() {
    if (this.state.downloadData.length > 0) return buildURI(...arguments);
  }

  /**
   * In IE11 this method will trigger the file download
   */
  handleLegacy(evt, data, headers, separator, filename) {
    // If this browser is IE 11, it does not support the `download` attribute
    if (this.state.downloadData.length > 0) {
      if (window.navigator.msSaveOrOpenBlob) {
        // Stop the click propagation
        evt.preventDefault();

        let blob = new Blob([toCSV(data, headers, separator)]);
        window.navigator.msSaveBlob(blob, filename);

        return false;
      }
    }
  }
  handleOnClick = (evt, downloadData, headers, separator, filename) => {
    this.setState({ shouldDownload: true });
    this.handleLegacy(evt, downloadData, headers, separator, filename);
  };

  render() {
    const { headers, separator, filename, uFEFF, children, ...rest } = this.props;
    console.log('zzsd:', this.state.downloadData);
    return (
      <Button
        variant="raised"
        download={filename}
        {...rest}
        ref={() => React.createRef()}
        href={this.buildURI(this.state.downloadData, uFEFF, headers, separator)}
        onClick={evt =>
          this.handleOnClick(evt, this.state.downloadData, headers, separator, filename)
        }
        color="primary"
      >
        {children}
      </Button>
    );
  }
}

export default compose(withApollo)(CSVLink);
