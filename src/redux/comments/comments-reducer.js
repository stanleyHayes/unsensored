import {COMMENTS} from "./comments-data";

const INITIAL_STATE = {
    comments: COMMENTS,
    loading: false,
    error: null,
    commentDetail: null
}

const commentsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){


        default:
            return state;
    }
}

export default commentsReducer;