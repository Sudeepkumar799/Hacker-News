import axios from 'axios';
import {
  CHANGE_CURRENT_PAGE_STORY_DATA,
  CHANGE_LOADING_STATUS,
  CHANGE_NEXT_PREV_PAGE_STORY_DATA,
  CHANGE_STORY_DATA,
  CHANGE_STORY_DATA_WITH_PAGE_NUMBER,
  CHANGE_STORY_HIDE_STATUS,
  CHANGE_STORY_VOTES,
} from './types';

export const changeLoading = () => {
  return {
    type: CHANGE_LOADING_STATUS,
    payload: true,
  };
};

export const getStoriesData = (type) => {
  return async (dispatch, getState) => {
    const {pageNumber, storyData} = getState().stories;
    const getPageNumber = type === undefined ? pageNumber : type === 'next' ? pageNumber + 1 : pageNumber - 1;

    if (storyData.hasOwnProperty(getPageNumber)) {
      if (type === undefined) {
        dispatch({
          type: CHANGE_CURRENT_PAGE_STORY_DATA,
          payload: storyData[getPageNumber],
        });
      } else dispatch({
        type: CHANGE_NEXT_PREV_PAGE_STORY_DATA,
        payload: {
          currentPageStoryData: storyData[getPageNumber],
          pageNumber: getPageNumber,
        },
      });
    } else {
      axios.get(`https://hn.algolia.com/api/v1/search?page=${getPageNumber}`).
          then(function(response) {
            const {hits} = response.data;
            const updatedHits = hits.map(data => {
              data.isVisible = true;
              return data;
            });
            let arr = storyData;
            arr[getPageNumber] = updatedHits;
            if (type === undefined) {
              dispatch({
                type: CHANGE_STORY_DATA,
                payload: {
                  storyData: arr,
                  currentPageStoryData: updatedHits,
                },
              });
            } else {
              dispatch({
                type: CHANGE_STORY_DATA_WITH_PAGE_NUMBER,
                payload: {
                  storyData: arr,
                  currentPageStoryData: updatedHits,
                  pageNumber: getPageNumber,
                },
              });
            }
          }).catch(function(error) {
        console.log(error);
        dispatch({
          type: CHANGE_LOADING_STATUS,
          payload: {
            loading: false,
          },
        });
      });
    }
  };
};

export const hideStory = (index) => {
  return async (dispatch, getState) => {
    const {pageNumber, storyData} = getState().stories;

    let tempStoryData = {...storyData};
    tempStoryData[pageNumber][index].isVisible = false;

    dispatch({
      type: CHANGE_STORY_HIDE_STATUS,
      payload: {
        storyData: tempStoryData,
        currentPageStoryData: tempStoryData[pageNumber],
      },
    });
  };
};

export const voteStory = (index) => {
  return async (dispatch, getState) => {
    const {pageNumber, storyData} = getState().stories;

    let tempStoryData = {...storyData};
    tempStoryData[pageNumber][index].points += 1;

    dispatch({
      type: CHANGE_STORY_VOTES,
      payload: {
        storyData: tempStoryData,
        currentPageStoryData: tempStoryData[pageNumber],
      },
    });
  };
};
