import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Post, User } from '../../types/types';
import { fetchUsers } from '../../services/usersService';
import { Button, LoadingOverlay } from '@mantine/core';
import classes from '../index.module.css';
import { CardPost } from '../../components/Card/Post/Post';
import { fetchPosts } from '../../services/postsService';
import { combineUsersAndPosts } from '../../utils/combineUsersPosts';
import { CardUser } from '../../components/Card/User/User';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export default function UserPage() {
  const router = useRouter();
  const { userName } = router.query;

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

  const user = users?.find((user) => user.userName === userName);
  const isUserAccount = user?.userName === 'JesusG';

  if (isLoadingUsers || isLoadingPosts)
    return (
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: 'lg', blur: 2 }}
        loaderProps={{ type: 'bars' }}
      />
    );

  if (errorUsers || errorPosts) return <div>Error fetching users posts</div>;

  if (!user) return <div>User not found</div>;

  const allPosts = users && posts ? combineUsersAndPosts(users, posts) : [];

  const userPosts = allPosts?.filter((post) => post.user?.id === user.id);

  return (
    <main className={classes.main}>
      <section className={classes.container}>
        <Button
          leftSection={<IconArrowLeft />}
          component={Link}
          href={'/'}
          mt={40}
          style={{ alignSelf: 'flex-start' }}
        >
          View All Posts
        </Button>
        <CardUser user={user} userAccount={isUserAccount} />
        {userPosts
          ? userPosts.map(
              (post) =>
                post.user && (
                  <CardPost
                    key={post.id}
                    user={post.user}
                    createdAt={post.createdAt}
                    content={post.content}
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
