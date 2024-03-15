import {
  Avatar,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Textarea,
  ThemeIcon,
} from '@mantine/core';
import classes from './User.module.css';
import { User } from '../../../types/types';
import { useDisclosure } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';
import Link from 'next/link';

interface CardUserProps {
  user: User;
  userAccount: boolean;
}

export function CardUser({ user, userAccount }: CardUserProps) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Paper radius="md" withBorder className={classes.card} mt={20} w={'100%'}>
      <Modal opened={opened} onClose={close} centered>
        <Textarea
          placeholder="Whats on your mind..."
          label="share your food thoughts"
          autosize
          minRows={2}
        />
      </Modal>

      <ThemeIcon className={classes.icon} size={60} radius={60}>
        <Avatar src={user.avatar} radius="xl" />
      </ThemeIcon>

      <Stack align="center">
        <Text
          component={Link}
          href={`/users/${user.userName}`}
          fw={700}
          className={classes.title}
        >
          {user.firstName} {user.lastName}
        </Text>
        <Text c="dimmed" ta="center" fz="sm">
          {user.followers.length} Followers | {user.following.length} Following
        </Text>
      </Stack>

      {userAccount && (
        <Group justify="center" mt={6}>
          <Button onClick={open} rightSection={<IconSend />}>
            Post
          </Button>
        </Group>
      )}
    </Paper>
  );
}
