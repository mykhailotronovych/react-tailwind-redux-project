import { Post } from '../types';
import { createReducer } from '@reduxjs/toolkit';
import { initialPostList } from '../constants';

interface BlogState {
    postList: Post[];
}

const initialState: BlogState = {
    postList: initialPostList,
};

const blogReducer = createReducer(initialState, (builder) => {});

export default blogReducer;
