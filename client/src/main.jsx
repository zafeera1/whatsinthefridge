import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import LandingPage from './pages/LandingPage';
import MyProfile from './pages/MyProfile';
import SignUp from './pages/SignUp';
import AiPage from './pages/AiPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'profile',
        element: <MyProfile />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'aipage',
        element: <AiPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);