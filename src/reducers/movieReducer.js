import { GET_MOVIES } from '../actions/types';

const initialState = {
  movies: [],
};

const movies = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    default:
      return state;
  }
};

export default movies;
