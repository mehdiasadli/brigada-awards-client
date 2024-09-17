import { BarChart } from '@mantine/charts';
import { Stack, Title } from '@mantine/core';
import { CategoryInfo, ContestInfo, TVote } from '../../types/models';
import { useUserResults } from '../../api/queries/result.queries';
import { useStatus } from '../../hooks/useStatus';

function transformResultsForBarChart(
  results: {
    contest: ContestInfo;
    category: CategoryInfo;
    votes: TVote[];
    rank: number;
  }[]
): { year: number; rank1: number; rank2: number; rank3: number }[] {
  // Create a Map to store aggregated data by year
  const yearMap = new Map<number, { rank1: number; rank2: number; rank3: number }>();

  // Process each result
  results.forEach((result) => {
    const year = result.contest.year;
    const rank = result.rank;

    // Get or initialize the data for this year
    let yearData = yearMap.get(year);
    if (!yearData) {
      yearData = { rank1: 0, rank2: 0, rank3: 0 };
      yearMap.set(year, yearData);
    }

    // Increment the appropriate rank count
    if (rank === 1) yearData.rank1++;
    else if (rank === 2) yearData.rank2++;
    else if (rank === 3) yearData.rank3++;
  });

  // Convert the Map to an array of BarChartData objects
  const barChartData: { year: number; rank1: number; rank2: number; rank3: number }[] = Array.from(
    yearMap,
    ([year, data]) => ({
      year,
      rank1: data.rank1,
      rank2: data.rank2,
      rank3: data.rank3,
    })
  );

  // Sort the data by year
  barChartData.sort((a, b) => a.year - b.year);

  return barChartData;
}

interface ProfileBarChartProps {
  userId: string;
}

export default function ProfileBarChart({ userId }: ProfileBarChartProps) {
  const { data: results, status: resultStatus, error, refetch } = useUserResults(userId);
  const { Component } = useStatus(resultStatus, {
    error,
    refetch,
  });
  const data = transformResultsForBarChart(results?.body ?? []);

  return (
    Component ??
    (data.length !== 0 ? (
      <Stack mx='auto' w='min(100%, 40rem)'>
        <Title order={3} ta='center'>
          İllər ərzində podyum sayı
        </Title>
        <BarChart
          h={300}
          data={data}
          dataKey='year'
          valueFormatter={(v) => `${v} Medal`}
          series={[
            { name: 'rank1', label: '1-ci Yer', color: 'yellow.6' },
            { name: 'rank2', label: '2-ci Yer', color: 'gray.6' },
            { name: 'rank3', label: '3-cü Yer', color: 'orange.9' },
          ]}
        />
      </Stack>
    ) : null)
  );
}
