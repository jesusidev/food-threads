import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../types/types';
import usersData from '../../data/users.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | { error: string }>,
) {
  try {
    res.status(200).json(usersData as User[]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
