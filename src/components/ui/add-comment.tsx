import { ActionIcon, Card, Textarea } from '@mantine/core';
import { IconMessage } from '@tabler/icons-react';
import { useAddComment } from '../../api/mutations/comment.mutations';
import { useState } from 'react';
import { useParticipation } from '../../api/queries/participant.queries';
import { useToast } from '../../hooks/useToast';

interface AddCommentProps {
  categoryId: string;
  contestId: string;
}

export default function AddComment({ categoryId, contestId }: AddCommentProps) {
  const { mutate, isPending } = useAddComment();
  const [content, setContent] = useState('');
  const { data } = useParticipation(contestId);
  const toast = useToast();

  const onAdd = () => {
    const participantId = data?.body?.id;

    if (!content) {
      toast.error('Boş komment əlavə edə bilməzsiniz');
      return;
    }

    if (!participantId) {
      toast.error('Komment etməyiniz üçün iştirakçı olmalısınız');
      return;
    }

    mutate(
      {
        content: content.trim(),
        participantId,
        categoryId,
      },
      {
        onSuccess() {
          setContent('');
        },
      }
    );
  };

  return (
    <Card>
      <Textarea
        autosize
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        size='lg'
        placeholder='Düşüncələrinizi yazın...'
        disabled={isPending}
        rightSection={
          <ActionIcon
            variant='light'
            size='lg'
            mt='auto'
            mb={8}
            loading={isPending}
            disabled={!content.trim()}
            onClick={onAdd}
          >
            <IconMessage size={22} />
          </ActionIcon>
        }
      />
    </Card>
  );
}
