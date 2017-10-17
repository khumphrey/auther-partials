import axios from 'axios';

/* ------------------    ACTIONS    --------------------- */

const SET = 'SET_CURRENT_USER';

/* --------------    ACTION CREATORS    ----------------- */

const set = user => ({ type: SET, user });

/* ------------------    REDUCER    --------------------- */

export default function reducer (currentUser = null, action) {
  switch (action.type) {

    case SET:
      return action.user;

    default:
      return currentUser;
  }
}

/* ------------     THUNK CREATORS    ------------------ */

/**
 * Thunk creators are similar to action creators, except what is being returned is a function (a thunk).
 *
 * Thunks, unlike actions, do side effects, such as route to another location.
 * This could get fairly elaborate, by taking arguments as to where to go, or
 * whether to change routes at all. But we illustrate a simple case with some
 * composed dispatchers which also route to a specific page.
 *
 * Components should know nothing about side effects.
 */

const resToData = res => res.data;

// a "simple" dispatcher which uses API, changes state, and returns a promise.
export const login = credentials => dispatch => {
  return axios.put('/api/auth/me', credentials)
  .then(resToData)
  .then(user => {
    dispatch(set(user));
    return user;
  });
};

// a "composed" dispatcher which uses the "simple" one, then routes to a page.
export const loginAndGoToUser = (credentials, history) => dispatch => {
  dispatch(login(credentials))
  .then(user => history.push(`/users/${user.id}`))
  .catch(err => console.error('Problem logging in:', err));
};