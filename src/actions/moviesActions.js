import axios from 'axios';
import { GET_MOVIES } from './types';

export const getMovies = q => async (dispatch) => {
  const res = await axios.get(`https://www.omdbapi.com/?s=${q}&apikey=5ce2c41a&type=movie`);

  dispatch({
    type: GET_MOVIES,
    payload: res.data.Search,
  });
};
