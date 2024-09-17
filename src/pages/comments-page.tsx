import { useParams } from 'react-router-dom';
import { useCategory } from '../api/queries/category.queries';
import { useStatus } from '../hooks/useStatus';
import { Container, Loader, Space, Stack, Text, Title } from '@mantine/core';
import { useComments } from '../api/queries/comment.queries';
import Infinite from '../components/ui/infinite';
import AddComment from '../components/ui/add-comment';
import CommentCard from '../components/ui/comment-card';

export default function CommentsPage() {
  const { categoryId } = useParams() as { categoryId: string };
  const { data, refetch, status, error } = useCategory(categoryId);
  const {
    data: commentsData,
    status: commentsStatus,
    error: commentsError,
    fetchNextPage,
    hasNextPage,
    fetchStatus,
    refetch: commentsRefetch,
  } = useComments({
    categoryId,
    sort_dir: 'desc',
    sort: 'createdAt',
  });
  const { Component } = useStatus([status, commentsStatus], { error, refetch });

  return (
    Component ??
    (data?.body && commentsData && (
      <Container size='xs'>
        <Stack gap={5}>
          <Title ta='center'>{data.body.award.name}</Title>
          <Text c='dimmed' ta='center'>
            {data.body.contest.name}
          </Text>
          <Space h={30} />
          <AddComment categoryId={categoryId} contestId={data.body.contestId} />
          {fetchStatus === 'fetching' && <Loader mx='auto' size='sm' type='bars' />}
          <Infinite
            data={commentsData}
            error={commentsError}
            status={commentsStatus}
            fetchNext={fetchNextPage}
            hasNext={hasNextPage}
            refetch={commentsRefetch}
            containerProps={{
              cols: {
                base: 1,
              },
            }}
            render={({ item }) => <CommentCard comment={item} />}
            emptyState='Komment yoxdur'
          />
        </Stack>
      </Container>
    ))
  );
}
