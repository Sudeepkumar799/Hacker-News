import axios from 'axios';
import {CHANGE_STORY_DATA} from './types';

export const getStoriesData = () => {
  return async (dispatch, getState) => {
    axios.get('https://hn.algolia.com/api/v1/search?page=0').then(function(response) {
          // handle success
          const {hits} = response.data;
          dispatch({
            type: CHANGE_STORY_DATA,
            payload: hits,
          });
        }).catch(function(error) {
          // handle error
          console.log(error);
        }).finally(function() {
          // always executed
        });
  };
};
