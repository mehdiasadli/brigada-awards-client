import './index.css';

import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import App from './app';
import PullToRefresh from 'pulltorefreshjs';

inject();

const standalone = window.matchMedia('(display-mode: standalone)').matches;
const ios = /iPhone|iPad|iPod/i.test(window.navigator.userAgent);

if (standalone && ios) {
  PullToRefresh.init({
    onRefresh() {
      window.location.reload();
    },
  });
}

createRoot(document.getElementById('root')!).render(<App />); 
