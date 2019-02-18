import types from '../constants/ActionType';
import AuthStatus from '../constants/LoginStatus';
import FacebookAPI from '../utils/Facebook';

const requestAuth = () => ({
  type: types.AUTH_REQUEST,
  loading: true,
});

const receiveAuth = (authenticated, auth = {}) => ({
  type: types.AUTH_RECEIVE,
  authenticated,
  auth,
});

const logout = () => dispatch =>
  FacebookAPI.logout().then(() =>
    dispatch({
      type: types.AUTH_REMOVE,
    }),
  );

const requestAuthCheck = () => ({
  type: types.AUTH_CHECK_REQUEST,
  loading: true,
});

const receiveResponse = response => dispatch => {
  const { authResponse, status } = response;
  if (status === AuthStatus.CONNECTED) {
    return dispatch(receiveAuth(true, authResponse));
  }

  if (status === AuthStatus.UNKNOWN || status === AuthStatus.NOT_AUTHORIZED) {
    return dispatch(receiveAuth(false));
  }

  if (status === AuthStatus.AUTHORIZATION_EXPIRED) {
    return dispatch(logout());
  }

  return response;
};

const authenticate = () => dispatch => {
  dispatch(requestAuth());
  return FacebookAPI.login().then(response =>
    dispatch(receiveResponse(response)),
  );
};

const initialize = () => dispatch => {
  dispatch(requestAuthCheck());
  return FacebookAPI.getLoginStatus().then(response =>
    dispatch(receiveResponse(response)),
  );
};

export { initialize, authenticate, logout };
