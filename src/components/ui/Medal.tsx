import { Text, TextProps } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { IconMedal } from '@tabler/icons-react';

interface MedalProps {
  rank: number;
  size?: number;
  showRank?: boolean;
  textProps?: TextProps;
}

export default function Medal({ rank, size = 20, showRank = false, textProps }: MedalProps) {
  const { colors } = useMantineTheme();

  const color =
    rank === 1
      ? colors.yellow[6]
      : rank === 2
        ? colors.gray[6]
        : rank === 3
          ? colors.orange[9]
          : 'transparent';

  return [1, 2, 3].includes(rank) ? (
    <IconMedal size={size} color={color} />
  ) : showRank && rank != 999 ? (
    <Text fw='bold' fz='xs' {...textProps}>
      {rank}
    </Text>
  ) : null;
}
