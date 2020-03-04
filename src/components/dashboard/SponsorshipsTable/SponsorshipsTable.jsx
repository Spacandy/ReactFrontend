// @flow
//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import Progress from 'components/animations/Progress';
import { withStyles } from '@material-ui/core/styles';
// import format from 'date-fns/format';
import { compose, graphql, withApollo } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import {
  SortingState,
  FilteringState,
  PagingState,
  GroupingState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedSorting,
  CustomPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  TableGroupRow,
  PagingPanel,
  GroupingPanel,
  DragDropProvider,
  TableColumnReordering,
  Toolbar,
  TableColumnVisibility,
  ColumnChooser,
  TableColumnResizing,
} from '@devexpress/dx-react-grid-material-ui';
import { CSVLink } from 'lib/react-csv';
import { HighlightedCell } from './cells/HighlightedCell';
import { CurrencyTypeProvider } from './providers/CurrencyTypeProvider';
import sponsorshipsQuery from './queries/sponsorships.graphql';
import { formatNumber, capitalize } from 'data/utils';

type Props = {};
type State = {};

const styles = theme => ({
  root: {
    height: 380,
  },
  speedDial: {
    position: 'static',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
    width: 55,
    float: 'right',
  },
});

const Cell = props => {
  if (props.column.name === 'total') {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
};

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

class SponsorshipsTable extends React.Component<Props, State> {
  state: State = {
    columns: [
      { name: 'sponsorship', title: 'Sponsorship' },
      { name: 'status', title: 'Status' },
      { name: 'total', title: 'Total' },
      { name: 'user', title: 'User' },
      { name: 'email', title: 'Email' },
      { name: 'date', title: 'Date' },
    ],
    defaultColumnWidths: [
      { columnName: 'sponsorship', width: 200 },
      { columnName: 'user', width: 150 },
      { columnName: 'email', width: 300 },
      { columnName: 'status', width: 150 },
      { columnName: 'date', width: 150 },
      { columnName: 'total', width: 150 },
    ],
    currencyColumns: ['total'],
    rows: [],
    sorting: [],
    totalCount: 0,
    pageSize: 10,
    pageSizes: [10, 25, 50],
    currentPage: 0,
    loading: true,
    selection: [],
    open: false,
    hidden: false,
  };

  changeSelection = selection => this.setState({ selection });

  componentDidMount = () => {
    if (this.props.eventId) this.loadData(this.props.eventId);
  };

  componentDidUpdate = () => {
    if (this.props.eventId) this.loadData(this.props.eventId);
  };

  changeSorting = sorting => {
    this.setState({
      loading: true,
      sorting,
    });
  };

  changeCurrentPage = currentPage => {
    this.setState({
      loading: true,
      currentPage,
    });
  };

  changePageSize = pageSize => {
    const totalPages = Math.ceil(this.state.totalCount / pageSize);
    const currentPage = Math.min(this.state.currentPage, totalPages - 1);

    this.setState({
      loading: true,
      pageSize,
      currentPage,
    });
  };

  getRows(results) {
    return results.map(r => {
      return {
        sponsorship: r.sponsorship.ticketName,
        status: capitalize(r.status),
        total: formatNumber(r.total),
        user: r.user,
        email: r.email,
        date: r.date,
      };
    });
  }

  loadData = eventId => {
    const { sorting, pageSize, currentPage, lastQueryParams, lastEventId } = this.state;

    const prarmsString = queryPrarmsGenerartor(sorting, pageSize, currentPage);

    if (prarmsString !== lastQueryParams || eventId !== lastEventId) {
      this.props.client
        .query({
          query: sponsorshipsQuery,
          variables: { eventId, queryParams: prarmsString },
          fetchPolicy: 'network-only',
        })
        .then(({ data }) => {
          this.setState({
            loading: false,
            rows: this.getRows(data.sponsorshipsTable.results),
            totalCount: data.sponsorshipsTable.count,
            lastQueryParams: prarmsString,
            lastEventId: eventId,
          });
          return data.sponsorshipsTable.results;
        })
        .catch(() => this.setState({ loading: false }));
    }
  };

  render() {
    const {
      rows,
      columns,
      currencyColumns,
      tableColumnExtensions,
      sorting,
      pageSize,
      pageSizes,
      currentPage,
      totalCount,
      loading,
      defaultColumnWidths,
    } = this.state;

    if (!this.props.eventId) return <h3>Please pick an event</h3>;

    return (
      <Paper style={{ position: 'relative' }}>
        <Grid rows={rows} columns={columns} getRowId={row => row.uid}>
          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
            defaultSorting={[{ columnName: 'date', direction: 'desc' }]}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={this.changePageSize}
            defaultPageSize={10}
            defaultCurrentPage={0}
          />
          <CustomPaging totalCount={totalCount} />
          <PagingPanel pageSizes={pageSizes} />

          <FilteringState />
          <GroupingState />

          <IntegratedGrouping />
          <IntegratedFiltering />
          <IntegratedSorting />

          <CurrencyTypeProvider for={currencyColumns} />
          <DragDropProvider />
          <Table columnExtensions={tableColumnExtensions} cellComponent={Cell} />
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
          <TableHeaderRow showSortingControls />

          <TableColumnReordering defaultOrder={columns.map(column => column.name)} />

          <TableFilterRow showFilterSelector />

          <TableGroupRow />
          <TableColumnVisibility />
          <Toolbar />
          <GroupingPanel showSortingControls />
          <ColumnChooser />
        </Grid>
        {loading && <Progress />}
      </Paper>
    );
  }
}

export default compose(
  withStyles(styles),
  withApollo,
)(SponsorshipsTable);
