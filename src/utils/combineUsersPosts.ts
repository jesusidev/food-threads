import { Comment, Post, User } from '../types/types';

export interface CommentWithUser extends Comment {
  user: User | null;
}

export interface UserPost extends Omit<Post, 'userID' | 'comments'> {
  user: User | null;
  comments: CommentWithUser[];
}

export function combineUsersAndPosts(users: User[], posts: Post[]): UserPost[] {
  return posts.map((post) => {
    const user =
      users.find((u) => String(u.id) === String(post.userID)) || null;

    const commentsWithUsers: CommentWithUser[] = post.comments.map(
      (comment) => {
        const commentUser =
          users.find((u) => String(u.id) === String(comment.userID)) || null;
        return { ...comment, user: commentUser };
      },
    );

    return { ...post, user, comments: commentsWithUsers };
  });
}
