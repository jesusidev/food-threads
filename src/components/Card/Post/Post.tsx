import { Avatar, Badge, Button, Card, Group, Text } from '@mantine/core';
import { IconHeart, IconMessage, IconShare2 } from '@tabler/icons-react';
import classes from './Post.module.css';
import { useState } from 'react';
import { User } from '../../../types/types';
import Link from 'next/link';
import { CommentWithUser } from '../../../utils/combineUsersPosts';

const avatarsSample = [
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png',
];

interface CardPostProps {
  createdAt: string;
  content: string;
  imgPost?: string;
  commentCount: number;
  likeCount: number;
  comments?: CommentWithUser[];
  user: User;
}

export function CardPost({
  createdAt,
  content,
  imgPost,
  commentCount,
  likeCount,
  comments,
  user,
}: CardPostProps) {
  const [showComments, setShowComments] = useState(false);
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <Card withBorder padding="lg" radius="md" miw={600} maw={600}>
      <Group justify="space-between">
        <Group>
          <Avatar src={user.avatar} radius="xl" />
          <Text size={'sm'} component={Link} href={`/users/${user.userName}`}>
            <strong>
              {user.firstName} {user.lastName}
            </strong>
            <br />@{user.userName}
          </Text>
        </Group>
        <Badge>{formattedDate}</Badge>
      </Group>

      <Card.Section className={classes.content}>
        {imgPost && <img src={imgPost} alt="post" />}
        <Text size="lg" lineClamp={3}>
          {content}
        </Text>
      </Card.Section>

      <Card.Section className={classes.sectionSplit}>
        <Group justify="space-between" mt="md">
          <Avatar.Group spacing="sm">
            {comments
              ? comments.map((comment) => (
                  <>
                    {comment.user && (
                      <Avatar src={comment.user.avatar} radius="xl" />
                    )}
                  </>
                ))
              : null}
          </Avatar.Group>
          <Group>
            <Button
              variant={'transparent'}
              size="xs"
              onClick={() => setShowComments(!showComments)}
            >
              {commentCount} comments
            </Button>
            <Button variant={'transparent'} size="xs">
              {likeCount} Likes
            </Button>
          </Group>
        </Group>
      </Card.Section>

      {showComments && (
        <Card.Section className={classes.sectionSplit}>
          <Group>
            {comments
              ? comments.map((comment) => (
                  <Group key={comment.id}>
                    {comment.user && (
                      <>
                        <Avatar src={comment.user.avatar} radius="xl" />
                        <Text
                          size={'sm'}
                          component={Link}
                          href={`/users/${comment.user.userName}`}
                        >
                          <strong>
                            {comment.user.firstName} {comment.user.lastName}
                          </strong>
                          <br />@{comment.user.userName}
                        </Text>
                      </>
                    )}

                    <Text>
                      {comment.content} -
                      <small>
                        {new Date(comment.createdAt).toLocaleDateString(
                          'en-US',
                        )}
                      </small>
                    </Text>
                  </Group>
                ))
              : null}
          </Group>
        </Card.Section>
      )}

      <Group mt="xs" justify="center">
        <Button radius="md">
          <IconMessage className={classes.icon} stroke={1.5} /> Like
        </Button>
        <Button radius="md">
          <IconHeart className={classes.icon} stroke={1.5} /> Comment
        </Button>
        <Button radius="md">
          <IconShare2 className={classes.icon} stroke={1.5} /> Share
        </Button>
      </Group>
    </Card>
  );
}
