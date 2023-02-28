import { Post } from '../types';
import { createReducer, createAction } from '@reduxjs/toolkit';
import { initialPostList } from '../constants';

interface BlogState {
    postList: Post[];
    editPost: Post | null;
}

const initialState: BlogState = {
    postList: initialPostList,
    editPost: null,
};

// post action
export const addPost = createAction<Post>('blog/ADD_POST');
export const deletePost = createAction<string>('blog/DELETE_POST');
export const startEdit = createAction<string>('blog/START_EDIT');
export const cancelEdit = createAction('blog/CANCEL_EDIT');
export const editingPost = createAction<Post>('blog/EDIT_POST');

// post reducer
const blogReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addPost, (state, action) => {
            state.postList.push(action.payload);
        })
        .addCase(deletePost, (state, action) => {
            const postId = action.payload;
            state.postList = state.postList.filter((post) => post.id !== postId);
        })
        .addCase(startEdit, (state, { payload: postId }) => {
            const foundedPost = state.postList.find((post) => post.id === postId);
            if (foundedPost) {
                state.editPost = foundedPost;
            }
        })
        .addCase(editingPost, (state, action) => {
            const { id } = action.payload;
            state.postList.some((post, index) => {
                if (post.id === id) {
                    state.postList[index] = action.payload;
                    return true;
                }
                return false;
            });
        })
        .addCase(cancelEdit, (state, action) => {
            state.editPost = null;
        });
});

export default blogReducer;
