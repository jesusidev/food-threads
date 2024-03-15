import { Post } from '../types/types';

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('/api/posts');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}
