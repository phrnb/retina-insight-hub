
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import AnalysisPage from './pages/AnalysisPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';

// Placeholder components for routes we'll implement later
const PatientsPage = () => <div>Patients page coming soon</div>;
const ResultsPage = () => <div>Results page coming soon</div>;
const ReportsPage = () => <div>Reports page coming soon</div>;
const SettingsPage = () => <div>Settings page coming soon</div>;
const HelpPage = () => <div>Help page coming soon</div>;

export const routes = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
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
