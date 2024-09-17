import { ActionIcon, Card, Flex, Stack, Text } from '@mantine/core';
import { TComment } from '../../types/models';
import UserPanel from './user-panel';
import dayjs from 'dayjs';
import { IconTrash } from '@tabler/icons-react';
import { useDeleteComment } from '../../api/mutations/comment.mutations';

interface CommentCardProps {
  comment: TComment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const { mutate, isPending } = useDeleteComment();

  return (
    <Card withBorder>
      <Stack gap={5}>
        <Flex align='center' justify='space-between'>
          <UserPanel
            user={comment.participant.user}
            description={
              <Text c='dimmed' fz='xs'>
                {dayjs(comment.createdAt).fromNow()}
              </Text>
            }
          />
          <ActionIcon
            color='red'
            variant='light'
            loading={isPending}
            onClick={() => {
              mutate({ id: comment.id });
            }}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Flex>
        <Text pl={50}>{comment.content}</Text>
      </Stack>
    </Card>
  );
}
