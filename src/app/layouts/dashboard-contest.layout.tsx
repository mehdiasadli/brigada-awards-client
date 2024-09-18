import { Box, Container, Stack, Tabs } from '@mantine/core';
import DashboardCategoriesPage from '../../pages/dashboard-categories.page';
import DashboardParticipantsPage from '../../pages/dashboard-participants.page';
import { useParams, useSearchParams } from 'react-router-dom';
import ContestSettings from '../../components/ui/contest-settings';
import { useContest } from '../../api/queries/contest.queries';
import { useStatus } from '../../hooks/useStatus';
import DashboardContestOverallPage from '../../pages/dashboard-contest-overall.page';
import DashboardResultsPage from '../../pages/dashboard-results.page';
import { useEffect, useState } from 'react';
import DashboardVotesPage from '../../pages/dashboard-votes.page';

export default function DashboardContestLayout() {
  const { id } = useParams() as { id: string };
  const { data, status, error, refetch } = useContest(id);
  const { Component } = useStatus(status, { error, refetch });
  const [params, setParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overall');

  const onTabChange = (tab: string | null) => {
    if (!tab) return;

    setParams((params) => {
      params.set('tab', tab);

      return params;
    });
  };

  useEffect(() => {
    if (!params.get('tab')) {
      setParams((params) => {
        params.set('tab', 'overall');

        return params;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActiveTab(params.get('tab') || 'overall');
  }, [params]);

  return (
    Component ??
    (data?.body && (
      <Stack>
        <Tabs defaultValue='overall' value={activeTab} onChange={onTabChange}>
          <Tabs.List grow>
            <Tabs.Tab value='overall'>Overall</Tabs.Tab>
            <Tabs.Tab value='categories'>Categories</Tabs.Tab>
            <Tabs.Tab value='participants'>Participants</Tabs.Tab>
            <Tabs.Tab value='results'>Results</Tabs.Tab>
            <Tabs.Tab value='votes'>Votes</Tabs.Tab>
            <Tabs.Tab value='settings'>Settings</Tabs.Tab>
          </Tabs.List>

          <Box py={25}>
            <Tabs.Panel value='overall'>
              <DashboardContestOverallPage contest={data.body} />
            </Tabs.Panel>
            <Tabs.Panel value='categories'>
              <DashboardCategoriesPage contestId={id} />
            </Tabs.Panel>
            <Tabs.Panel value='participants'>
              <DashboardParticipantsPage contestId={id} />
            </Tabs.Panel>
            <Tabs.Panel value='results'>
              <DashboardResultsPage contest={data.body} />
            </Tabs.Panel>
            <Tabs.Panel value='votes'>
              <DashboardVotesPage contest={data.body} />
            </Tabs.Panel>
            <Tabs.Panel value='settings'>
              <Container size='sm' pt={10} pb={30}>
                <ContestSettings contest={data.body} />
              </Container>
            </Tabs.Panel>
          </Box>
        </Tabs>
      </Stack>
    ))
  );
}
