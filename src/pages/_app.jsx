import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/styles/globals.css'
import '/src/styles/motion.scss'
import '/src/styles/widget.scss'
import '/src/styles/font.scss'
import LoginPage from './loginPage';
import HomePage from '.';
import ProfilePage from './profile';


function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const isAuth = useSelector((state) => {
        console.log("Token from Redux state:", state.auth.token);
        return Boolean(state.auth.token);
    });

    useEffect(() => {
        if (!isAuth && router.pathname !== '/') {
            router.push('/');
        } else if (isAuth && router.pathname === '/') {
            router.push('/homePage');
        }
    }, [isAuth, router.pathname]);

    const routes = isAuth ? (
        <Component {...pageProps} />
    ) : (
        <LoginPage />
    );

    return <div className="app">{routes}</div>;
}

export default function AppWrapper({ Component, pageProps }) {
    return (
        <Provider store={store}>
            {/* Wrap your app with PersistGate */}
            <PersistGate loading={null} persistor={persistor}>
                <MyApp Component={Component} pageProps={pageProps} />
            </PersistGate>
        </Provider>
    );
}
