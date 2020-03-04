import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import locationReducer from 'reducers/location';
import modalsReducer from 'reducers/modals';
import sidebarReducer from 'reducers/sidebars';
import eventReducer from 'reducers/event';
import runtimeReducer from 'reducers/runtime';
import authReducer from 'reducers/auth';
import eventFormReducer from 'reducers/eventForm';
import checkoutReducer from 'reducers/checkout';

export default combineReducers({
  runtime: runtimeReducer,
  form: formReducer,
  auth: authReducer,
  location: locationReducer,
  modals: modalsReducer,
  sidebars: sidebarReducer,
  event: eventReducer,
  eventForm: eventFormReducer,
  checkout: checkoutReducer,
});
