//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import {
  SearchkitManager,
  SearchkitProvider,
  SearchBox,
  RefinementListFilter,
  NoHits,
  LayoutResults,
  ActionBar,
  ActionBarRow,
  Hits,
  HitsStats,
  Layout,
  TopBar,
  LayoutBody,
  SideBar,
  SearchkitComponent,
  SelectedFilters,
  MenuFilter,
  HierarchicalMenuFilter,
  Pagination,
  ResetFilters,
} from 'searchkit';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import theme from './Browse.css';
import EventBox from 'components/events/EventBox';

type Propstype = {};

type Statetype = {};

const searchkit = new SearchkitManager(
  'https://search-eventhi-naxzpvs6c5neupoveuuzbllvqa.us-west-2.es.amazonaws.com/eventhi/event',
);

const HitItem = props => {
  const { bemBlocks, result } = props;
  const name = result._source.name;
  const source = result._source;
  return (
    <EventBox
      search
      slug={source.doc.name_slug}
      image={source.doc.logo}
      name={source.doc.name}
      location={source.doc.location}
      schedule={source.doc.start_date}
      tickets={{}}
      lowestTicketPrice={0}
      timezone={source.doc.timezone}
    />
  );
};

class Browse extends React.Component<PropsType, StateType> {
  props: Propstype;
  state: Statetype;

  render() {
    return (
      <NoSsr>
        <SearchkitProvider searchkit={searchkit}>
          <Layout className={theme.layout}>
            <SearchBox
              searchOnChange
              queryOptions={{ analyzer: 'standard' }}
              queryFields={['doc.name^5', 'doc.location.address_locality']}
            />

            <LayoutBody>
              <LayoutResults>
                <Hits
                  mod="sk-hits-grid"
                  hitsPerPage={10}
                  itemComponent={HitItem}
                  sourceFilter={[
                    'doc.name',
                    'doc.location.address_locality',
                    'doc.categories',
                    'doc.name_slug',
                    'doc.logo',
                    'doc.date_added',
                    'doc.start_date',
                  ]}
                />
                <NoHits />
                <Pagination showNumbers />
              </LayoutResults>
            </LayoutBody>
          </Layout>
        </SearchkitProvider>
      </NoSsr>
    );
  }
}

export default withStyles(theme)(Browse);
