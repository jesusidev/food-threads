export interface Post {
  id: number;
  userID: number;
  content: string;
  likes: number;
  img_url: string;
  status: 'public' | 'private';
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  userID: number;
  postID: number;
  content: string;
  createdAt: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  avatar: string;
  followers: Array<{ id: number }>;
  following: Array<{ id: number }>;
}
