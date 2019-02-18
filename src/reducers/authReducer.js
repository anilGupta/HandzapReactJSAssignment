import types from '../constants/ActionType';

const initialState = {
  authenticated: null,
  loading: true,
  error: false,
  token: null,
  user: {},
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_CHECK_REQUEST: {
      return Object.assign({}, state, { loading: true });
    }

    case types.AUTH_CHECK_RECEIVE:
    case types.AUTH_RECEIVE: {
      return Object.assign({}, state, {
        loading: false,
        authenticated: action.authenticated,
        auth: action.auth,
      });
    }

    case types.AUTH_REMOVE: {
      return Object.assign(
        {},
        Object.assign({}, initialState, {
          loading: false,
          authenticated: false,
        }),
      );
    }

    default:
      return state;
  }
};

export default authReducer;
