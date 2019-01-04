import axios from 'axios';
import { GET_MOVIES } from './types';

export const getMovies = () => async (dispatch) => {
  const res = await axios.get('http://www.omdbapi.com/?s=marvel&apikey=5ce2c41a&page=1');

  dispatch({
    type: GET_MOVIES,
    payload: res.data.Search,
  });
};
