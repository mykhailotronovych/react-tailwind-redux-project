import { Post } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { initialPostList } from '../constants';
import type { PayloadAction } from '@reduxjs/toolkit';

interface BlogState {
    postList: Post[];
    editPost: Post | null;
}

const initialState: BlogState = {
    postList: initialPostList,
    editPost: null,
};

// ! this is old way
// * post action
// export const addPost = createAction<Post>('blog/ADD_POST');
// export const deletePost = createAction<string>('blog/DELETE_POST');
// export const startEdit = createAction<string>('blog/START_EDIT');
// export const cancelEdit = createAction('blog/CANCEL_EDIT');
// export const editingPost = createAction<Post>('blog/EDIT_POST');

// * post reducer
// const blogReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(addPost, (state, action) => {
//             state.postList.push(action.payload);
//         })
//         .addCase(deletePost, (state, action) => {
//             const postId = action.payload;
//             state.postList = state.postList.filter((post) => post.id !== postId);
//         })
//         .addCase(startEdit, (state, { payload: postId }) => {
//             const foundedPost = state.postList.find((post) => post.id === postId);
//             if (foundedPost) {
//                 state.editPost = foundedPost;
//             }
//         })
//         .addCase(editingPost, (state, action) => {
//             const { id } = action.payload;
//             state.postList.some((post, index) => {
//                 if (post.id === id) {
//                     state.postList[index] = action.payload;
//                     return true;
//                 }
//                 return false;
//             });
//         })
//         .addCase(cancelEdit, (state, action) => {
//             state.editPost = null;
//         });
// });

// export default blogReducer;

// ! this is new way
// * createSlice là sự kết hợp của createReducer và createAction
// * createSlice sẽ tự động tạo ra action và reducer
const blogReducer = createSlice({
    name: 'blog', // * Đây là prefix cho action type
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            state.postList.push(action.payload);
        },
        deletePost: (state, action: PayloadAction<string>) => {
            const postId = action.payload;
            state.postList = state.postList.filter((post) => post.id !== postId);
        },
        startEdit: (state, { payload: postId }: PayloadAction<string>) => {
            const foundedPost = state.postList.find((post) => post.id === postId);
            if (foundedPost) {
                state.editPost = foundedPost;
            }
        },
        cancelEdit: (state) => {
            state.editPost = null;
        },
        editingPost: (state, action: PayloadAction<Post>) => {
            const { id } = action.payload;
            state.postList.some((post, index) => {
                if (post.id === id) {
                    state.postList[index] = action.payload;
                    return true;
                }
                return false;
            });
        },
    },
});

export const { addPost, cancelEdit, deletePost, editingPost, startEdit } = blogReducer.actions;
export default blogReducer.reducer;
