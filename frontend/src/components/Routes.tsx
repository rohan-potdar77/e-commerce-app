import { lazy } from 'react';
import { Outlet, RouteObject, useRoutes } from 'react-router-dom';
import { APP_USERS } from '../shared/constants';

const NotFound = lazy(() => import('../components/NotFound'));
const Website = lazy(() => import('../views/Website'));
const Products = lazy(() => import('../views/Products'));
const Layout = lazy(() => import('./Layout'));
const Login = lazy(() => import('../views/Login'));
const ForgotPassword = lazy(() => import('../views/ForgotPassword'));
const ResetPassword = lazy(() => import('../views/ResetPassword'));
const Cart = lazy(() => import('../views/Cart'));
const Authenticate = lazy(() => import('../components/Authenticate'));

const applicationRoutes: RouteObject[] = [
    { path: '/', element: <Website /> },
    { path: '/login', element: <Login /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/reset-password', element: <ResetPassword /> },
    {
        path: '/user',
        element: (
            <Authenticate accessTo={APP_USERS.USER}>
                <Layout />
                <Outlet />
            </Authenticate>
        ),
        children: [
            { path: 'home', element: <Products /> },
            { path: 'cart', element: <Cart /> },
        ],
    },
    {
        path: '/administrator',
        element: (
            <Authenticate accessTo={APP_USERS.ADMINISTRATOR}>
                <Outlet />
            </Authenticate>
        ),
        children: [{ path: 'home', element: <h4>Administrator Dashboard</h4> }],
    },
    { path: '*', element: <NotFound /> },
];

const Routes = () => useRoutes(applicationRoutes);

export default Routes;
