import { LOGIN, LOGOUT } from '../actions-type/auth';

export const loginUser = (params) => {
  return {
    type: LOGIN,
    payload: new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  };
};

export const logoutUser = () => {
	return {
		type: LOGOUT,
	}
}