import { Button, ButtonProps } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useAuth } from '../../stores/auth.store';

interface LogoutButtonProps extends ButtonProps {
  withIcon?: boolean;
}

export default function LogoutButton({ withIcon = true, ...props }: LogoutButtonProps) {
  const { resetUser } = useAuth();

  return (
    <Button
      variant='subtle'
      color='red'
      onClick={() => {
        resetUser();
      }}
      leftSection={withIcon ? <IconLogout size={16} /> : undefined}
      {...props}
    >
      Çıxış Et
    </Button>
  );
}
