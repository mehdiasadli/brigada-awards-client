import { Alert, Card, Center, Stack, Text, Title } from '@mantine/core';
import { TCategory } from '../../types/models';

interface CategoryProps {
  category: TCategory;
}

export default function Category({ category }: CategoryProps) {
  if (!category.award) {
    return <Alert>Mükafat məlumatı yoxdur</Alert>;
  }

  return (
    <Card withBorder radius='md'>
      <Center h='100%'>
        <Stack gap={0}>
          <Title size='xl' ta='center'>
            {category.award.name}
          </Title>
          {!!category.award?.description && (
            <Text size='sm' mt='sm' c='dimmed' ta='center'>
              {category.award.description}
            </Text>
          )}
        </Stack>
      </Center>
    </Card>
  );
}
