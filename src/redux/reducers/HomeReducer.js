import {
  HOME_GET_DATA_ATTEMPT,
  HOME_GET_DATA_SUCCESS,
  HOME_GET_DATA_FAILED,
  HOME_CLEAR_DATA_ARRAY,
  HOME_CLEAR_DATA,
} from '../types';

const initialState = {
  Processing: false,
  Type: 0,
  CompletedTasks: [],
  UnCompletedTasks: [],
  Error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_GET_DATA_ATTEMPT:
      return {
        ...state,
        Processing: true,
        Type: action.payload.Type,
        Error: null,
      };

    case HOME_GET_DATA_SUCCESS:
      return {
        ...state,
        Processing: false,
        CompletedTasks: [...action.payload.CompletedTasks],
        UnCompletedTasks: [...action.payload.UnCompletedTasks],
        Page: action.payload.Page,
      };

    case HOME_GET_DATA_FAILED:
      return {
        ...state,
        Processing: false,
        Error: action.payload.Error,
      };

    case HOME_CLEAR_DATA_ARRAY: {
      return {
        ...state,
        CompletedTasks: [],
        UnCompletedTasks: [],
      };
    }

    case HOME_CLEAR_DATA:
      return {
        ...state,
        Processing: false,
        CompletedTasks: [],
        UnCompletedTasks: [],
        Type: 0,
        Error: null,
      };
    default:
      return state;
  }
};
