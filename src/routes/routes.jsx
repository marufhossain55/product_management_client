import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root';
import Home from '../Pages/Home';
import Login from '../Pages/authentication/Login';
import Registration from '../Pages/authentication/Registration';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      { path: '/login', element: <Login /> },
      { path: '/registration', element: <Registration /> },
    ],
  },
]);
export default router;
