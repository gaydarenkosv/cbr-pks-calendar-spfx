export const SET_USERNAME = 'SET_USERNAME';
export const SET_USERID = 'SET_USERID';
export const SET_IS_EDITOR = 'SET_IS_EDITOR';
export const SET_IS_VIEWER = 'SET_IS_VIEWER';
export const SET_ROOMS = 'SET_ROOMS';
export const ADD_ROOM = 'ADD_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';
export const EXIT_ROOM = 'EXIT_ROOM';
export const SET_CON_STATUS = 'SET_CON_STATUS';

// new types start here:
export const SET_EDIT_MODE = 'SET_EDIT_MODE';

export const SET_ERROR = 'SET_ERROR';
export const CHANGE_DATE = 'CHANGE_DATE';
export const CHANGE_DATE_SUCCESS = 'CHANGE_DATE_SUCCESS';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const CHANGE_FILTER_EVENT = 'CHANGE_FILTER_EVENT';
export const CHANGE_FILTER_EVENT_SUCCESS = 'CHANGE_FILTER_EVENT_SUCCESS';
export const INFINITY_LOAD_EVENT_SUCCESS = 'INFINITY_LOAD_EVENT_SUCCESS';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';

export const EDIT_EVENT = 'EDIT_EVENT';
export const CLOSE_EDIT_EVENT = 'CLOSE_EDIT_EVENT';
export const RUN_EDIT_EVENT = 'RUN_EDIT_EVENT';
export const SAVE_EDIT_EVENT = 'SAVE_EDIT_EVENT';
export const SAVE_EDIT_EVENT_SUCCESS = 'SAVE_EDIT_EVENT_SUCCESS';
export const DELETE_EVENT = 'DELETE_EVENT';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';

// Comments
export const GET_EVENT_COMMENTS = 'GET_EVENT_COMMENTS';
export const GET_EVENT_COMMENTS_SUCCESS = 'GET_EVENT_COMMENTS_SUCCESS';
export const CLOSE_EVENT_COMMENTS = 'CLOSE_EVENT_COMMENTS';
export const INFINITY_LOAD_EVENT_COMMENTS_SUCCESS = 'INFINITY_LOAD_EVENT_COMMENTS_SUCCESS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const CLOSE_EDIT_COMMENT = 'CLOSE_EDIT_COMMENT';
export const RUN_EDIT_COMMENT = 'RUN_EDIT_COMMENT';
export const SAVE_EDIT_COMMENT = 'SAVE_EDIT_COMMENT';
export const SAVE_EDIT_COMMENT_SUCCESS = 'SAVE_EDIT_COMMENT_SUCCESS';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const SET_EVENT_COUNT_COMMENT = 'SET_EVENT_COUNT_COMMENT';

// View event
export const GET_EVENT_PARTICIPANTS = 'GET_EVENT_PARTICIPANTS';
export const GET_EVENT_PARTICIPANTS_SUCCESS = 'GET_EVENT_PARTICIPANTS_SUCCESS';
export const CLOSE_EVENT_PARTICIPANTS = 'CLOSE_EVENT_PARTICIPANTS';
export const INFINITY_LOAD_EVENT_PARTICIPANTS_SUCCESS = 'INFINITY_LOAD_EVENT_PARTICIPANTS_SUCCESS';
export const GET_EVENT_MATERIALS = 'GET_EVENT_MATERIALS';
export const GET_EVENT_MATERIALS_SUCCESS = 'GET_EVENT_MATERIALS_SUCCESS';
export const CLOSE_EVENT_MATERIALS = 'CLOSE_EVENT_MATERIALS';
export const INFINITY_LOAD_EVENT_MATERIALS_SUCCESS = 'INFINITY_LOAD_EVENT_MATERIALS_SUCCESS';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

export const HOST = window.location.origin;
export const WS_HOST = window.location.origin.replace(/^http/, 'ws');

export const maxRequestLength = 500 * 1024 * 1024;