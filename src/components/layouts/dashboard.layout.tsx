import {
  Button,
  ButtonProps,
  ElementProps,
  Flex,
  FlexProps,
  Stack,
  StackProps,
  Title,
  TitleProps,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useModal } from '../../hooks/useModal';

interface DashboardLayoutProps extends Omit<StackProps, 'children'> {
  title: string;
  children: React.ReactNode;
  headerProps?: FlexProps;
  titleProps?: TitleProps;
  createComponent?: JSX.Element;
  createProps?:
    | false
    | (ButtonProps &
        ElementProps<'button', keyof ButtonProps> & {
          onModal?: (modal: ReturnType<typeof useModal>) => void;
        });
  filtersComponent?: JSX.Element;
}

export default function DashboardLayout({
  children,
  title,
  createComponent,
  createProps,
  filtersComponent,
  titleProps,
  headerProps,
  ...props
}: DashboardLayoutProps) {
  const modal = useModal();

  return (
    <Stack gap={25} px={10} {...props}>
      <Flex align='center' justify='space-between' {...headerProps}>
        <Title order={3} {...titleProps}>
          {title}
        </Title>
        {createComponent ? (
          createComponent
        ) : createProps ? (
          <Button
            children='Create'
            leftSection={<IconPlus size={16} />}
            {...createProps}
            onClick={(e) => {
              if (createProps?.onModal) {
                createProps?.onModal(modal);
              }

              createProps?.onClick?.(e);
            }}
          />
        ) : null}
      </Flex>
      {filtersComponent}
      {children}
    </Stack>
  );
}
