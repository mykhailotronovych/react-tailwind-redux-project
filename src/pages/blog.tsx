import { CreatePost, PostList } from 'components';

export default function Blog() {
    return (
        <div className="p-5">
            <CreatePost />
            <PostList />
        </div>
    );
}
