import {
  AvatarProps,
  Group,
  GroupProps,
  Stack,
  StackProps,
  Text,
  TextProps,
  useMantineTheme,
} from '@mantine/core';
import { TUser } from '../../types/models';
import UserAvatar from './user-avatar';
import { useUser } from '../../hooks/useUser';
import { IconCrown } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export interface UserPanelProps extends GroupProps {
  user?: TUser;
  withUsername?: boolean;
  withDescription?: boolean;
  description?: React.ReactNode;
  avatarProps?: AvatarProps;
  stackProps?: StackProps;
  titleProps?: TextProps;
  descriptionProps?: TextProps;
  withCrown?: boolean;
  titleDescription?: React.ReactNode;
  withFirstName?: boolean;
  link?: boolean | string;
}

export default function UserPanel({
  user,
  withDescription = true,
  withUsername,
  description,
  avatarProps,
  stackProps,
  titleProps,
  descriptionProps,
  withCrown = true,
  titleDescription,
  withFirstName = false,
  link,
  ...props
}: UserPanelProps) {
  const currentUser = useUser();
  const selectedUser = user ?? currentUser;
  const {
    colors: { yellow },
  } = useMantineTheme();

  return (
    <Group
      gap={10}
      {...props}
      renderRoot={
        !link
          ? undefined
          : (p) => <Link to={link === true ? '/users/' + selectedUser.username : link} {...p} />
      }
    >
      <UserAvatar user={selectedUser} {...avatarProps} />
      <Stack gap={0} {...stackProps}>
        <Group align='center' gap={8}>
          <Text fw='bold' fz='sm' {...titleProps}>
            {withFirstName ? selectedUser.name.split(' ')?.[0] : selectedUser.name}
          </Text>
          {selectedUser.admin && withCrown && <IconCrown size={16} color={yellow[4]} />}
          {titleDescription ? (
            typeof titleDescription === 'string' ? (
              <Text fz='xs'>{titleDescription}</Text>
            ) : (
              titleDescription
            )
          ) : null}
        </Group>
        {withDescription ? (
          description ? (
            description
          ) : withUsername ? (
            <Text c='dimmed' fz='xs' {...descriptionProps}>
              @{selectedUser.username}
            </Text>
          ) : null
        ) : null}
      </Stack>
    </Group>
  );
}
