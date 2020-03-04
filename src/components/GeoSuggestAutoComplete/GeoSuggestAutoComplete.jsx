//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow
/* global google*/

// import React, { Component } from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import theme from './GeoSuggestAutoComplete.css';
// import AutoComplete from 'xxxmaterial-ui/AutoComplete';

// type PropsType = {
//   name: string,
//   searchText: string,
//   onPlaceChange: Function,
//   floatingLabelText: string,
//   hintText: string,
//   options: {},
//   location: {
//     lat: number,
//     lng: number,
//   },
//   radius: number,
//   onNewRequest: Function,
//   onChange: Function,
//   getRef: Function,
//   types: Array<string>,
//   bounds: {},
// };

// type DefaultPropsType = {
//   name: string,
//   onPlaceChange: Function,
//   floatingLabelText: string,
//   hintText: string,
//   options: {},
//   location: {
//     lat: number,
//     lng: number,
//   },
//   radius: number,
// };

// type StateType = {};

// class GeoSuggestAutoComplete extends Component<DefaultPropsType, PropsType, StateType> {
//   props: PropsType;
//   state: StateType = {
//     dataSource: [],
//     data: [],
//   };

//   static defaultProps: DefaultPropsType = {
//     name: 'muiGeoSuggest',
//     onPlaceChange: () => {},
//     floatingLabelText: '',
//     hintText: '',
//     options: {},
//     location: { lat: 0, lng: 0 },
//     radius: 0,
//     filter: AutoComplete.noFilter,
//   };

//   getDerivedStateFromProps(nextProps) {
//     if (this.props.searchText !== nextProps.searchText) {
//       this.onUpdateInput(nextProps.searchText, this.state.dataSource);
//       this.onInputChange(nextProps.searchText);
//     }
//   }

//   updateDatasource(data) {
//     if (!data || !data.length) {
//       return false;
//     }

//     if (this.state.data) {
//       this.previousData = { ...this.state.data };
//     }
//     this.setState({
//       dataSource: data.map(place => place.description),
//       data,
//     });
//   }

//   getBounds() {
//     if (!this.props.bounds || (!this.props.bounds.ne && !this.props.bounds.south)) {
//       return undefined;
//     }

//     if (this.props.bounds.ne && this.props.bounds.sw) {
//       return new google.maps.LatLngBounds(this.props.bounds.sw, this.props.bounds.ne);
//     }

//     return {
//       ...this.props.bounds,
//     };
//   }

//   onUpdateInput(searchText, dataSource) {
//     if (!searchText.length || !this.autocompleteService) {
//       return false;
//     }

//     let request = {
//       input: searchText,
//       location: new google.maps.LatLng(this.props.location.lat, this.props.location.lng),
//       radius: this.props.radius,
//       types: this.props.types,
//       bounds: this.getBounds(),
//     };

//     this.autocompleteService.getPlacePredictions(request, data => {
//       return this.updateDatasource(data);
//     });
//   }

//   onNewRequest(searchText, index) {
//     // The index in dataSource of the list item selected, or -1 if enter is pressed in the TextField
//     if (index === -1) {
//       return false;
//     }
//     const data = this.previousData || this.state.data;

//     this.props.onNewRequest(data[index], searchText, index);
//   }

//   onInputChange(searchText, dataSource, params) {
//     this.props.onChange({ target: { value: searchText } }, dataSource, params);
//   }

//   componentDidMount() {
//     if (
//       typeof window.google !== 'undefined' &&
//       typeof window.google.maps !== 'undefined'
//     ) {
//       const inputElement = document.getElementsByName(this.props.name)[0];

//       this.apiObj = new window.google.maps.places.Autocomplete(
//         inputElement,
//         this.props.options,
//       );

//       this.apiObj.addListener('place_changed', () => {
//         this.onPlaceChange(this.apiObj.getPlace());
//       });
//     } else {
//       console.error('Google API object is not defined');
//     }
//   }
//   autocompleteService = new google.maps.places.AutocompleteService();
//   render() {
//     const { location, radius, bounds, types, ...autoCompleteProps } = this.props; // eslint-disable-line no-unused-vars

//     return (
//       <AutoComplete
//         {...autoCompleteProps}
//         ref={this.props.getRef}
//         filter={this.props.filter}
//         onUpdateInput={this.onInputChange.bind(this)}
//         dataSource={this.state.dataSource}
//         onNewRequest={this.onNewRequest.bind(this)}
//       />
//     );
//   }
// }

// export default withStyles(theme)(GeoSuggestAutoComplete);
