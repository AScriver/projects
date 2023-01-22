import { createAction } from "redux-actions";
// import API from "../../utils/API"

export const signinReq = createAction("SIGNIN_REQ");
export const signoutReq = createAction("SIGNOUT_REQ");
export const signinRes = createAction("SIGNIN_RES");
export const signoutRes = createAction("SIGNOUT_RES");
export const updateAuth = createAction("UPDATE_AUTH");



// export function signin(email, password) {
//     return function(dispatch) {
//       return API.signIn(email, password).then(res => dispatch(updateAuth(res.data)));
//     }
//   }