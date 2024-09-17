import { ActionIcon, Card, Flex, Stack, Title } from "@mantine/core";

interface StatCardProps {
  info: number;
  title: string;
  icon?: React.ReactNode;
}

export default function StatCard({ title, icon, info }: StatCardProps) {
  return (
    <Card withBorder>
      <Stack gap={10}>
        <Flex align='center' justify='space-between'>
          <Title order={5} c='dimmed'>
            {title}
          </Title>
          {!!icon && (
            <ActionIcon variant='subtle' color='gray' radius='xl'>
              {icon}
            </ActionIcon>
          )}
        </Flex>
        <Title order={1}>{info}</Title>
      </Stack>
    </Card>
  );
}
