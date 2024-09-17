import { useParams } from 'react-router-dom';
import { useCategory } from '../api/queries/category.queries';
import { useStatus } from '../hooks/useStatus';
import { Container, Stack, Text, Title } from '@mantine/core';

export default function CommentsPage() {
  const { categoryId } = useParams() as { categoryId: string };
  const { data, refetch, status, error } = useCategory(categoryId);
  const { Component } = useStatus(status, { error, refetch });

  return (
    Component ??
    (data?.body && (
      <Container size='md'>
        <Stack>
          <Title ta='center'>{data.body.award.name}</Title>
          <Text c='dimmed' ta='center'>
            {data.body.contest.name}
          </Text>
          <Text ta='center' c='red' mt={25}>Komment xüsusiyyəti hal-hazırda aktiv deyil</Text>
        </Stack>
      </Container>
    ))
  );
}
