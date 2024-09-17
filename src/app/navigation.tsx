import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../stores/auth.store';
import HomePagesLayout from './layouts/home-pages.layout';
import DashboardPagesLayout from './layouts/dashboard-pages.layout';

import LoginPage from '../pages/login.page';
import HomePage from '../pages/home.page';
import ProfilePage from '../pages/profile.page';

import DashboardStatsPage from '../pages/dashboard-stats.page';
import DashboardUsersPage from '../pages/dashboard-users.page';
// import DashboardCommentsPage from '../pages/dashboard-comments.page';
import DashboardAwardsPage from '../pages/dashboard-awards.page';
import VotePage from '../pages/vote.page';
import VoteCategoryPage from '../pages/vote-category.page';
import DashboardContestLayout from './layouts/dashboard-contest.layout';
import ContestsPage from '../pages/contests-page';
import ContestPage from '../pages/contest-page';
import AwardsPage from '../pages/awards-page';
import CommentsPage from '../pages/comments-page';

export default function Navigation() {
  const { token, admin } = useAuth();

  return (
    <Routes>
      <Route path='/login' element={token ? <Navigate to='/' replace /> : <LoginPage />} />
      <Route path='/' element={!token ? <Navigate to='/login' replace /> : <HomePagesLayout />}>
        <Route index element={<HomePage />} />
        <Route path='users/:username' element={<ProfilePage />} />
        <Route path='vote' element={<VotePage />} />
        <Route path='vote/:category' element={<VoteCategoryPage />} />
        <Route path='contests' element={<ContestsPage />} />
        <Route path='contests/:id' element={<ContestPage />} />
        <Route path='awards' element={<AwardsPage />} />
        <Route path='awards/:id' element={<ContestPage />} />
        <Route path='comments/:categoryId' element={<CommentsPage />} />
        <Route
          path='dashboard'
          element={admin !== true ? <Navigate to='..' replace /> : <DashboardPagesLayout />}
        >
          <Route index element={<DashboardStatsPage />} />
          <Route path='users' element={<DashboardUsersPage />} />
          <Route path='awards' element={<DashboardAwardsPage />} />
          <Route path='contests/:id' element={<DashboardContestLayout />} />
          {/* <Route path='comments' element={<DashboardCommentsPage />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}
