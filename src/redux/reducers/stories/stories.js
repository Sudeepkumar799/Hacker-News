import {CHANGE_STORY_DATA} from '../../actions/types';

const initialState = {
  storyData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STORY_DATA:
      return {
        ...state,
        storyData: action.payload,
      };
    default:
      return state;
  }
}
