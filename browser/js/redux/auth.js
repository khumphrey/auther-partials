import axios from 'axios';

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';


const login = (user) => ({ type: SET_CURRENT_USER, user });
const logout = () => ({ type: LOGOUT_CURRENT_USER });

export default function reducer (state = null, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user;

    case LOGOUT_CURRENT_USER:
      return null;

    default:
      return state;
  }
}

export const loginUser = (email, password) => {
  return dispatch => {
    axios.post('/login', { email, password })
      .then(res => res.data)
      .then(user => dispatch(login(user)))
      .catch(err => console.error('Login unsuccesful', err));
    };
};

export const signUpUser = (email, password) => {
  return dispatch => {
    axios.post('/api/users', { email, password })
      .then(res => res.data)
      .then(user => dispatch(loginUser(user.email, user.password)))
      .catch(err => console.error('Signup unsuccesful', err));
  };
};

export const logoutUser = () => {
  return dispatch => {
    axios.post('/logout')
    .then(res => dispatch(logout()))
    .catch(err => console.error('Couldn\'t log out', err));
  };
};

export const fetchLoggedInUser = () => {
  return dispatch => {
    axios.get('/api/auth/me')
    .then(res => res.data)
    .then(user => {
      user = user ? user : null;
      dispatch(login(user))
    })
    .catch(err => console.error('Couldn\'t fetch user', err));
  };
};
