import { Badge, BadgeProps } from '@mantine/core';
import { TContest } from '../../types/models';
import { Link } from 'react-router-dom';

interface ContestChipProps extends BadgeProps {
  contest: TContest;
  link?: true | string;
}

export default function ContestChip({ contest, link, ...props }: ContestChipProps) {
  return (
    <Badge
      size='md'
      p={15}
      variant='white'
      sx={{ cursor: 'pointer' }}
      renderRoot={
        !link
          ? undefined
          : (p) => <Link to={link === true ? '/dashboard/contests/' + contest.id : link} {...p} />
      }
      {...props}
    >
      {contest.name}
    </Badge>
  );
}
