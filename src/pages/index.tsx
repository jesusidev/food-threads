import { CardPost } from '../components/Card/Post/Post';
import classes from './index.module.css';
import { useQuery } from '@tanstack/react-query';
import { Post, User } from '../types/types';
import { LoadingOverlay } from '@mantine/core';
import { combineUsersAndPosts } from '../utils/combineUsersPosts';
import { fetchUsers } from '../services/usersService';
import { fetchPosts } from '../services/postsService';
import { CardUser } from '../components/Card/User/User';

export default function IndexPage() {
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const {
    data: posts,
    isLoading: isLoadingPosts,
    error: errorPosts,
  } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoadingUsers || isLoadingPosts)
    return (
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: 'lg', blur: 2 }}
        loaderProps={{ type: 'bars' }}
      />
    );
  if (errorUsers || errorPosts) return <div>Error loading data</div>;

  const allPosts = users && posts ? combineUsersAndPosts(users, posts) : [];
  const user = users?.find((user) => user.userName === 'JesusG');
  const isUserAccount = user?.userName === 'JesusG';

  return (
    <main className={classes.main}>
      <section className={classes.container}>
        {user && <CardUser user={user} userAccount={isUserAccount} />}
        {allPosts
          ? allPosts.map(
              (post) =>
                post.user && (
                  <CardPost
                    key={post.id}
                    user={post.user}
                    createdAt={post.createdAt}
                    content={post.content}
                    imgPost={post.img_url}
                    commentCount={post.comments.length}
                    likeCount={post.likes}
                    comments={post.comments}
                  />
                ),
            )
          : null}
      </section>
    </main>
  );
}
