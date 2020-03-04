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
import soldTicketsQuery from './queries/soldTickets.graphql';
import checkinMutation from './mutations/checkin.graphql';

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
  if (props.column.name === 'price') {
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

class CheckInTable extends React.Component<Props, State> {
  state: State = {
    columns: [
      { name: 'guest', title: 'Guest' },
      { name: 'email', title: 'Email' },
      { name: 'date', title: 'Date' },
      { name: 'name', title: 'Ticket Type' },
      { name: 'price', title: 'Price' },
    ],
    defaultColumnWidths: [
      { columnName: 'guest', width: 150 },
      { columnName: 'email', width: 300 },
      { columnName: 'date', width: 300 },
      { columnName: 'name', width: 300 },
      { columnName: 'price', width: 150 },
    ],
    currencyColumns: ['price'],
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

  handleCheckin = tickets => {
    this.props
      .mutate({
        variables: {
          eventId: this.props.eventId,
          ticketsUID: tickets,
        },
      })
      .then(({ data }) => {
        console.info(`checked in ${data}`);
      })
      .catch(error => {
        console.error(`there was an error mutating ${error}`);
      });
  };

  changeSelection = selection => this.setState({ selection });

  componentDidMount = () => {
    if (this.props.eventId)
      this.loadData(this.props.eventId);
  };

  componentDidUpdate = () => {
    if (this.props.eventId)
      this.loadData(this.props.eventId);
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

  loadData = eventId => {
    const { sorting, pageSize, currentPage, lastQueryParams, lastEventId } = this.state;

    const prarmsString = queryPrarmsGenerartor(sorting, pageSize, currentPage);

    if (prarmsString !== lastQueryParams || eventId !== lastEventId) {
      this.props.client
        .query({
          query: soldTicketsQuery,
          variables: { eventId, queryParams: prarmsString },
          fetchPolicy: 'network-only',
        })
        .then(({ data }) => {
          this.setState({
            loading: false,
            rows: data.transactionItems.results,
            totalCount: data.transactionItems.count,
            lastQueryParams: prarmsString,
            lastEventId: eventId,
          });
          return data.transactionItems.results;
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

    if (!this.props.eventId)
      return (<h3>Please pick an event</h3>);

    return (
      <Paper style={{ position: 'relative' }}>
        <Grid rows={rows} columns={columns} getRowId={row => row.uid}>
          <CSVLink eventId={this.props.eventId} style={{ margin: 20 }}>
            Download Guest List
          </CSVLink>
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
  graphql(checkinMutation),
  withStyles(styles),
  withApollo,
)(CheckInTable);
