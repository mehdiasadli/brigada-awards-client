import { Anchor, Button, Card, Container, Flex, Popover, Select, Stack, Text } from '@mantine/core';
import { useLogs } from '../api/queries/log.queries';
import ListFilters from '../components/ui/list-filters';
import { useListFilters } from '../hooks/useListFilters';
import { useStatus } from '../hooks/useStatus';
import { TLog } from '../types/models';
import Infinite from '../components/ui/infinite';
import { useState } from 'react';
import { Badge } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDeleteLogs } from '../api/mutations/log.mutations';
import { IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';

const methods = ['POST', 'DELETE', 'PUT'];
const methodColors = {
  POST: 'blue',
  DELETE: 'red',
  PUT: 'orange',
};

export default function LogsPage() {
  const { query, searchValue, setSearch, setSorting, sorting } = useListFilters<TLog>({
    searchFields: ['username', 'path'],
    defaultSorting: 'desc-createdAt',
  });
  const [method, setMethod] = useState<string | null>(null);
  const { mutate, isPending } = useDeleteLogs();

  const { data, refetch, error, status, fetchNextPage, hasNextPage } = useLogs({
    ...query,
    method,
  });
  const { Component } = useStatus(status, { error, refetch });

  console.log(data);

  return (
    <Container size='md'>
      <Stack>
        <ListFilters
          searchProps={{ placeholder: 'Search for path or username' }}
          filters={{ searchValue, setSearch, setSorting, sorting }}
        >
          <Select
            value={method}
            onChange={setMethod}
            clearable
            data={methods}
            label='Method'
            placeholder='Pick a method'
          />
        </ListFilters>
        <Button
          variant='light'
          leftSection={<IconTrash size={20} />}
          color='red'
          ml='auto'
          w='min(100%, 20rem)'
          loading={isPending}
          onClick={() => {
            mutate();
          }}
        >
          Delete All logs
        </Button>
        {Component ?? (
          <Infinite
            data={data}
            error={error}
            status={status}
            fetchNext={fetchNextPage}
            hasNext={hasNextPage}
            refetch={refetch}
            containerProps={{ cols: { base: 1 } }}
            render={({ item }) => (
              <Card withBorder>
                <Stack>
                  <Flex align='center' justify='space-between' gap={10}>
                    <Badge
                      h={25}
                      w={100}
                      color={methodColors[item.method as keyof typeof methodColors]}
                    >
                      {item.method}
                    </Badge>
                    <Popover>
                      <Popover.Target>
                        <Button radius='xl' size='xs' variant='light'>
                          Body
                        </Button>
                      </Popover.Target>
                      <Popover.Dropdown>{JSON.stringify(item.body, null, 2)}</Popover.Dropdown>
                    </Popover>
                  </Flex>
                  <Flex align='center' justify='space-between' gap={10}>
                    <Text fw='bold'>{item.path}</Text>
                    <Text c='dimmed' fz='xs'>
                      {dayjs(item.createdAt).format('HH:mm:ss, DD.MM.YYYY')}
                    </Text>
                  </Flex>
                  {item.userId && item.username && (
                    <Flex align='center' justify='space-between'>
                      <Anchor component={Link} to={'/users/' + item.username} fz={'lg'}>
                        {item.username}
                      </Anchor>
                      <Text c='dimmed'>{item.userId}</Text>
                    </Flex>
                  )}
                </Stack>
              </Card>
            )}
            emptyState='No logs were found'
          />
        )}
      </Stack>
    </Container>
  );
}
