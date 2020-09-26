const INITIAL_STATE = {
    replies: [],
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