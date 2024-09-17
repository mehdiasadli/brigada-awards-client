import { Center, CenterProps, Stack, StackProps, useMantineTheme } from '@mantine/core';
import { IconDatabasePlus, IconDatabaseX } from '@tabler/icons-react';

interface DashboardCardInfoProps extends StackProps {
  count?: number;
  children?: React.ReactNode;
  centerProps?: CenterProps;
  innerStackProps?: StackProps;
  emptyIcon?: JSX.Element;
  onAdd?: () => void;
}

export default function DashboardCardInfo({
  children,
  count,
  emptyIcon,
  innerStackProps,
  centerProps,
  onAdd,
  ...props
}: DashboardCardInfoProps) {
  const { colors } = useMantineTheme();

  return (
    <Stack h='100%' gap={0} py={5} sx={{ borderRadius: 6 }} {...props}>
      <Center h='100%' py={5} {...centerProps}>
        <Stack gap={10} align='center' {...innerStackProps}>
          {typeof count === 'number' && count <= 0
            ? (emptyIcon ??
              (onAdd ? (
                <IconDatabasePlus
                  style={{ cursor: 'pointer' }}
                  onClick={onAdd}
                  size={25}
                  color={colors.gray[5]}
                />
              ) : (
                <IconDatabaseX onClick={onAdd} size={25} color={colors.gray[5]} />
              )))
            : children}
        </Stack>
      </Center>
    </Stack>
  );
}
