import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../types/types';
import postsData from '../../data/posts.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | { error: string }>,
) {
  try {
    res.status(200).json(postsData as Post[]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
