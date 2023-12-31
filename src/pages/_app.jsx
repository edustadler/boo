import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Provider, useDispatch, useSelector } from 'react-redux';
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
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => {
        return Boolean(state.auth.token);
    });

    useEffect(() => {
        const isAuth = Boolean(store.getState().auth.token);
        if (!isAuth && router.pathname !== '/') {
            router.push('/');
        } else if (isAuth && (router.pathname === '/' || router.pathname === '/homePage')) {
            router.push('/homePage', '/homePage');
        } else if (isAuth && router.pathname === '/homePage') {
            router.push('/', '/');
        }
    }, [isAuth, router.pathname]);

    const routes = isAuth ? (<>
        <Head>
            <title>Tzup</title>
            <meta
                name="Tzup - social"
                content="Connecting everywhere!"
            />
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
    </>) : (<>
        <Head>
            <title>Tzup</title>
            <meta
                name="Tzup - social"
                content="Connecting everywhere!"
            />
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <LoginPage />
    </>);

    return <div className="app">{routes}</div>;
}

export default function AppWrapper({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MyApp Component={Component} pageProps={pageProps} />
            </PersistGate>
        </Provider>
    );
}
