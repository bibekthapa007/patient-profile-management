import { combineReducers } from 'redux';
import i18n from 'features/i18n/i18nSlice';
import patient from 'features/patient/PatientSlice';
import auth from '../features/auth/AuthSlice';

const reducers = combineReducers({
  auth,
  patient,
  i18n,
});

export default reducers;
