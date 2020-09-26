import {REPLIES} from "./replies-data";

const INITIAL_STATE = {
    replies: REPLIES,
    loading: false,
    error: null,
    commentDetail: null
}

const repliesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){


        default:
            return state;
    }
}

export default repliesReducer;