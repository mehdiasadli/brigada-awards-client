import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, MantineColor, MantineProvider } from '@mantine/core';
import { MantineEmotionProvider, emotionTransform } from '@mantine/emotion';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { DatesProvider } from '@mantine/dates';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import 'dayjs/locale/az';

dayjs.locale('az');
dayjs.extend(relativeTime);

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0,
    },
    queries: {
      retry: 0,
    },
  },
});

export const primaryColor: MantineColor = 'teal';
const theme = createTheme({
  primaryColor,
  primaryShade: 6,
});

import Navigation from './navigation';

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <MantineProvider stylesTransform={emotionTransform} theme={theme}>
          <MantineEmotionProvider>
            <DatesProvider settings={{ locale: 'az' }}>
              <Notifications />
              <ModalsProvider>
                <Navigation />
              </ModalsProvider>
            </DatesProvider>
          </MantineEmotionProvider>
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
