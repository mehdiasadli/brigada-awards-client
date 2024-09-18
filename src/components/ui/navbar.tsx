import {
  Anchor,
  ComboboxItem,
  ComboboxParsedItem,
  Group,
  Loader,
  rem,
  Select,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useUser } from '../../hooks/useUser';
import { IconSearch } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../buttons/logout.button';
import { selectData } from '../../utils/select-data';

import classes from '../../assets/styles/navbar.module.css';
import { navbar } from '../../resources/navbar';
import { useUsers } from '../../api/queries/user.queries';
import { convertExtendedLetters } from '../../utils/convert-extended-letters';
import { useContests } from '../../api/queries/contest.queries';
import { flatList } from '../../utils/flat-list';
import { primaryColor } from '../../app';
import { useModal } from '../../hooks/useModal';

const optionsFilter = ({
  options,
  search,
  limit,
}: {
  limit: number;
  options: ComboboxParsedItem[];
  search: string;
}) => {
  const splittedSearch = convertExtendedLetters(search).toLowerCase().trim().split(' ');

  return (options as ComboboxItem[])
    .filter((option) => {
      const words = convertExtendedLetters(option.label)
        .toLowerCase()
        .trim()
        .split(' ')
        .concat(convertExtendedLetters(option.value).toLowerCase());
      return splittedSearch.every((sw) => words.some((w) => w.includes(sw)));
    })
    .slice(0, limit);
};

export default function Navbar() {
  const { admin } = useUser();
  const modal = useModal();
  const { data: users } = useUsers({
    take: 100,
  });
  const { data, status } = useContests({
    sort: 'createdAt',
    sort_dir: 'desc',
    take: 100,
  });
  const contests = flatList(data);

  const navigate = useNavigate();

  const mainLinks = navbar.links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink} component={Link} to={link.link}>
      <div className={classes.mainLinkInner}>
        <link.Icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
    </UnstyledButton>
  ));

  const collectionLinks = navbar.collections.map((collection) => (
    <Link to={collection.link} key={collection.label} className={classes.collectionLink}>
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}>{collection.emoji}</span>{' '}
      {collection.label}
    </Link>
  ));

  return (
    <>
      <nav className={classes.navbar}>
        <Select
          placeholder='İstifadəçi axtar'
          size='xs'
          searchable
          onOptionSubmit={(value) => {
            navigate('/users/' + value);
          }}
          leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
          data={selectData(users, 'name', 'username')}
          clearable
          filter={optionsFilter}
          limit={5}
          mb='sm'
        />

        <div className={classes.section}>
          <div className={classes.mainLinks}>{mainLinks}</div>
        </div>

        {admin && (
          <div className={classes.section}>
            <Group className={classes.collectionsHeader} justify='space-between'>
              <Text size='xs' fw={500} c='dimmed'>
                Panel
              </Text>
            </Group>
            <div className={classes.collections}>{collectionLinks}</div>
          </div>
        )}

        {admin &&
          (status === 'pending' ? (
            <Loader type='dots' color={primaryColor} />
          ) : (
            <div className={classes.section}>
              <Group className={classes.collectionsHeader} justify='space-between'>
                <Text size='xs' fw={500} c='dimmed'>
                  Müsabiqələr
                </Text>
              </Group>
              <div className={classes.collections}>
                {contests.map((contest) => (
                  <Link
                    to={'/dashboard/contests/' + contest.id}
                    key={contest.id}
                    className={classes.collectionLink}
                  >
                    {contest.name}
                  </Link>
                ))}
                <Anchor
                  c={primaryColor}
                  className={classes.collectionLink}
                  onClick={() => {
                    modal.openCreateContest({});
                  }}
                >
                  Yeni Müsabiqə Yarat
                </Anchor>
              </div>
            </div>
          ))}

        <Stack mt='auto' gap={10}>
          <LogoutButton />
        </Stack>
      </nav>
    </>
  );
}
