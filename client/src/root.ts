import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import transactionsSlice from './transactions/slices/transactionsSlice';
import appSlice from './app/slices/appSlice';
import timeReportSlice from './time-report/slices/timeReportSlice';
import projectSlice from './projects/slices/projectSlice';

const authenticationReducer = (state = null, action: any) => {
  switch (action.type) {
    case 'AAD_LOGIN_SUCCESS':
      return action.payload;
    case 'AAD_LOGOUT_SUCCESS':
      return null;
    default:
      return state;
  }
};

//State där vi har slice av statet
const rootReducer = (history:any) => combineReducers({
  app: appSlice,
  project: projectSlice.reducer,
  transaction: transactionsSlice.reducer,
  timeReport: timeReportSlice.reducer,
  authentication: authenticationReducer,
  router: connectRouter(history)
});

export default rootReducer;