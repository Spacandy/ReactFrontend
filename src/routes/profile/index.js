// //              ___             _   _  _ _
// //             | __|_ _____ _ _| |_| || (_)
// // Property of:| _|\ V / -_) ' \  _| __ | |
// //             |___|\_/\___|_||_\__|_||_|_|
// //

// import React from 'react';
// import Layout from 'components/Layout';

// export default {
//   path: '/profile',
//   chunks: ['profile'],
//   children: [
//     {
//       path: '/u/:id',
//       action() {
//         return {
//           title: 'User Profile',
//           component: <h1>User Profile</h1>,
//         };
//       },
//     },
//     {
//       path: '/o/:id',
//       action() {
//         return {
//           title: 'Org Profile',
//           component: <h1>Org profile</h1>,
//         };
//       },
//     },
//   ],

//   // middleware
//   action({ next }) {
//     const data = await next();
//     return {
//       ...data,
//       title: 'Profile',
//       chunk: 'profile',
//       component: <Layout>{data.component}</Layout>,
//     };
//   },
// };
