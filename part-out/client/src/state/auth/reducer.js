import { handleActions } from "redux-actions";
import { signinReq, signoutReq, updateAuth } from "./actions";

const defaultState = {
  authenticated: false,
  email: null,
  username: null,
  profileImg: null,
  id: null,
  createdAt: null,
  updatedAt: null,
  verified: null,
  permissions: null,
  status: null,
};

const authReducer = handleActions({
  [signinReq]: (state, action) => {
    return {
      username: action.payload.username,
      authenticated: action.payload.authenticated,
      email: action.payload.email,
      profileImg: action.payload.profileImg,
      id: action.payload.id,
      createdAt: action.payload.createdAt,
      updatedAt: action.payload.updatedAt,
      verified: action.payload.verified,
      permissions: action.payload.permissions,
      status: action.payload.status
    };
  },
  [signoutReq]: (state, action) => defaultState,
  [updateAuth]: (state, action) => action.payload
}, defaultState);

export default authReducer;
