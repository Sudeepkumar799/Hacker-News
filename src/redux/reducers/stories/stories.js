import {
  CHANGE_CURRENT_PAGE_STORY_DATA,
  CHANGE_NEXT_PREV_PAGE_STORY_DATA,
  CHANGE_STORY_DATA,
  CHANGE_STORY_DATA_WITH_PAGE_NUMBER,
  CHANGE_STORY_HIDE_STATUS,
  CHANGE_STORY_VOTES,
} from '../../actions/types';

const initialState = {
  pageNumber: 0,
  storyData: {},
  currentPageStoryData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STORY_DATA:
      return {
        ...state,
        storyData: action.payload.storyData,
        currentPageStoryData: action.payload.currentPageStoryData,
      };
    case CHANGE_STORY_DATA_WITH_PAGE_NUMBER:
      return {
        ...state,
        storyData: action.payload.storyData,
        currentPageStoryData: action.payload.currentPageStoryData,
        pageNumber: action.payload.pageNumber,
      };
    case CHANGE_CURRENT_PAGE_STORY_DATA:
      return {
        ...state,
        currentPageStoryData: action.payload,
      };
    case CHANGE_NEXT_PREV_PAGE_STORY_DATA:
      return {
        ...state,
        currentPageStoryData: action.payload.currentPageStoryData,
        pageNumber: action.payload.pageNumber,
      };
    case CHANGE_STORY_HIDE_STATUS:
    case CHANGE_STORY_VOTES:
      return {
        ...state,
        storyData: action.payload.storyData,
        currentPageStoryData: action.payload.currentPageStoryData,
      };
    default:
      return state;
  }
}
