//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

// import React, { Component } from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import theme from './LocationMap.css';
// // import GoogleMapReact from 'google-map-react';
// import Icon from 'favicon.ico';

// type PropsType = {};

// type DefaultPropsType = {};

// type StateType = {};

// let Map, Marker, Popup, TileLayer;
// class LocationMap extends Component {
//   componentDidMount() {
//     //Only runs on Client, not on server render
//     Map = require('react-leaflet').Map;
//     Marker = require('react-leaflet').Marker;
//     Popup = require('react-leaflet').Popup;
//     TileLayer = require('react-leaflet').TileLayer;
//     this.forceUpdate();
//   }

//   render() {
//     return Map
//       ? <Map style={{ height: '220px !important' }} center={this.props.center} zoom={13}>
//           <TileLayer
//             url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
//             attribution="©EventHi Inc"
//           />
//           <Marker position={this.props.center}>
//             <Popup>
//               <span>A pretty CSS3 popup.<br />Easily customizable.</span>
//             </Popup>
//           </Marker>
//         </Map>
//       : null;
//   }
// }

// // class LocationMap extends Component<DefaultPropsType, PropsType, StateType> {
// //   props: PropsType;
// //   static defaultProps: DefaultPropsType = {
// //     zoom: 5,
// //     center: { lat: 59.744465, lng: 30.042834 },
// //   };

// //   generateMarker = () => {
// //     return;
// //   };

// //   createMapOptions = maps => {
// //     return {
// //       styles: [
// //         {
// //           stylers: [
// //             {
// //               hue: '#00aeef',
// //             },
// //           ],
// //         },
// //       ],
// //     };
// //   };
// //   render() {
// //     console.log(this.props.center);
// //     return (
// //       <GoogleMapReact
// //         center={this.props.center}
// //         defaultZoom={this.props.zoom}
// //         options={this.createMapOptions}
// //       >
// //         {this.props.center !== [34.0522342, -118.2436849]
// //           ? <img
// //               src={Icon}
// //               style={{
// //                 width: 20,
// //                 height: 20,
// //               }}
// //               lat={this.props.center[0]}
// //               lng={this.props.center[1]}
// //             />
// //           : <img
// //               src={Icon}
// //               style={{
// //                 width: 20,
// //                 height: 20,
// //                 visibility: hidden,
// //               }}
// //               lat={this.props.center[0]}
// //               lng={this.props.center[1]}
// //             />}
// //       </GoogleMapReact>
// //     );
// //   }
// // }

// export default withStyles(theme)(LocationMap);
