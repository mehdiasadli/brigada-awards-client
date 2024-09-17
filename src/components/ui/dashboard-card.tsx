import {
  ActionIcon,
  ActionIconProps,
  Card,
  CardProps,
  Group,
  GroupProps,
  rem,
  Stack,
  StackProps,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useModal } from '../../hooks/useModal';
import dayjs from 'dayjs';
import { UseMutationResult } from '@tanstack/react-query';
import { Id, SuccessResponseWithoutPagination } from '../../types/server';
import { HttpError } from '../../resources/HttpError';
import classes from '../../assets/styles/dashboard-info.module.css';
import { IconEdit, IconTrash } from '@tabler/icons-react';

type Prisma = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export interface DashboardCardProps<TModel extends Prisma> extends Omit<CardProps, 'children'> {
  item: TModel;
  children: React.ReactNode;
  renderEdit?: ((item: TModel) => boolean | JSX.Element) | boolean | JSX.Element;
  renderDelete?: ((item: TModel) => boolean | JSX.Element) | boolean | JSX.Element;
  onEditModalClick?: (modal: ReturnType<typeof useModal>) => void;
  deleteModalTitle?: string;
  groupProps?: GroupProps;
  stackProps?: StackProps;
  actionGroupProps?: GroupProps;
  editButtonProps?: ActionIconProps;
  deleteButtonProps?: ActionIconProps;
  mutation?: UseMutationResult<SuccessResponseWithoutPagination<Id>, HttpError, Id>;
  footer?: ((item: TModel) => JSX.Element) | false | JSX.Element;
  withActions?: boolean;
  actions?: React.ReactNode;
}

export default function DashboardCard<TModel extends Prisma>({
  item,
  children,
  renderDelete = true,
  renderEdit = true,
  deleteModalTitle,
  onEditModalClick,
  editButtonProps,
  deleteButtonProps,
  mutation,
  stackProps,
  actionGroupProps,
  groupProps,
  footer,
  withActions = true,
  actions,
  ...props
}: DashboardCardProps<TModel>) {
  const theme = useMantineTheme();
  const modal = useModal();

  const onDelete = () => {
    mutation?.mutate?.({ id: item.id });
  };

  const renderEditButton = renderEdit instanceof Function ? renderEdit(item) : renderEdit;
  const renderDeleteButton = renderDelete instanceof Function ? renderDelete(item) : renderDelete;

  return (
    <Card withBorder padding='lg' radius='md' className={classes.card} {...props}>
      <Stack h='100%' {...stackProps}>
        {children}
      </Stack>

      {withActions && (
        <Card.Section className={classes.footer}>
          <Group justify='space-between' {...actionGroupProps}>
            {footer === false
              ? null
              : footer instanceof Function
                ? footer(item)
                : (footer ?? (
                    <Text fz='xs' c='dimmed' ta='right'>
                      {dayjs(item.createdAt).format('DD.MM.YYYY')}
                    </Text>
                  ))}
            <Group gap={5} {...groupProps}>
              {renderEditButton === true ? (
                <ActionIcon
                  variant='subtle'
                  color='gray'
                  onClick={() => {
                    onEditModalClick?.(modal);
                  }}
                  {...editButtonProps}
                >
                  <IconEdit
                    style={{ width: rem(18), height: rem(18) }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                </ActionIcon>
              ) : renderEditButton === false ? null : (
                renderEditButton
              )}
              {renderDeleteButton === true ? (
                <ActionIcon
                  variant='subtle'
                  color='gray'
                  loading={mutation?.isPending}
                  onClick={() =>
                    modal.confirmDelete(
                      deleteModalTitle || 'You are deleting this resource',
                      onDelete
                    )
                  }
                  {...deleteButtonProps}
                >
                  <IconTrash
                    style={{ width: rem(18), height: rem(18) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                </ActionIcon>
              ) : renderDeleteButton === false ? null : (
                renderDeleteButton
              )}
              {actions}
            </Group>
          </Group>
        </Card.Section>
      )}
    </Card>
  );
}
