import { Avatar, AvatarProps } from '@mantine/core';
import { TUser } from '../../types/models';
import { useUser } from '../../hooks/useUser';
import { cropImage } from '../../utils/crop-image';
import { primaryColor } from '../../app';

interface UserAvatarProps extends AvatarProps {
  user?: TUser;
}

export default function UserAvatar({ user, ...props }: UserAvatarProps) {
  const currentUser = useUser();
  const selectedUser = user ?? currentUser;

  return (
    <Avatar color={primaryColor} src={cropImage(selectedUser.image) ?? null} {...props}>
      {selectedUser.name[0]}
    </Avatar>
  );
}
