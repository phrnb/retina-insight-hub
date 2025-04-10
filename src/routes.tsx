
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import PatientsPage from './pages/PatientsPage';
import AnalysisPage from './pages/AnalysisPage';
import ResultsPage from './pages/ResultsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import NotFound from './pages/NotFound';
import AuthPage from './pages/AuthPage';
import NotificationsPage from './pages/NotificationsPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import ReportHistoryPage from './pages/ReportHistoryPage';
import SecondOpinionPage from './pages/SecondOpinionPage';

export const routes = createBrowserRouter([
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/patients',
        element: <PatientsPage />,
      },
      {
        path: '/analysis',
        element: <AnalysisPage />,
      },
      {
        path: '/results',
        element: <ResultsPage />,
      },
      {
        path: '/reports',
        element: <ReportsPage />,
      },
      {
        path: '/reports/history/:reportId',
        element: <ReportHistoryPage />,
      },
      {
        path: '/second-opinion/:caseId?',
        element: <SecondOpinionPage />,
      },
      {
        path: '/notifications',
        element: <NotificationsPage />,
      },
      {
        path: '/knowledge',
        element: <KnowledgeBasePage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: '/help',
        element: <HelpPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
