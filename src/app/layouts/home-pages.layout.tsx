import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppShell, Box, Burger, Flex, Group, Image } from '@mantine/core';
import { useDisclosure, useHotkeys, useMediaQuery } from '@mantine/hooks';
import { assets } from '../../assets';
import Navbar from '../../components/ui/navbar';
import { HEADER_HEIGHT, NAVBAR_WIDTH } from '../../resources/constants';
import { useEffect } from 'react';
import UserPanel from '../../components/ui/user-panel';
import UserAvatar from '../../components/ui/user-avatar';
import { useUser } from '../../hooks/useUser';
import { primaryColor } from '..';

export default function HomePagesLayout() {
  const [opened, { toggle, close }] = useDisclosure();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery('(max-width: 520px)');
  const { username } = useUser();

  useEffect(() => {
    close();
  }, [close, pathname]);

  useHotkeys([
    [
      'mod+B',
      () => {
        toggle();
      },
    ],
  ]);

  return (
    <>
      <AppShell
        header={{ height: HEADER_HEIGHT }}
        navbar={{
          width: NAVBAR_WIDTH,
          breakpoint: 'sm',
          collapsed: { desktop: !opened, mobile: !opened },
        }}
        padding='md'
      >
        <AppShell.Header>
          <Flex h='100%' pl='md' pr='xl' justify='space-between' align='center'>
            <Group h='100%'>
              <Burger color={primaryColor} opened={opened} onClick={toggle} size='sm' />
              <Image src={assets.icons.awardsTextColored} w={120} />
            </Group>
            <Box component={Link} to={'/users/' + username}>
              {isMobile ? <UserAvatar /> : <UserPanel />}
            </Box>
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar py='md' px={4}>
          <Navbar />
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
