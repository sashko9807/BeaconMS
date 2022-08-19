import { createAction } from '@reduxjs/toolkit';

export const REAUTHORIZE = '/user/reauth';
export const LOGOUT = '/user/logout';

export const reAuth = createAction(REAUTHORIZE);
export const logOut = createAction(LOGOUT);
