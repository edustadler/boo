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
        } else if (isAuth && router.pathname === '/') {
            router.push('/homePage');
        }
    }, [isAuth, router.pathname]);

    const routes = isAuth ? (<>
        <head>
            <title>Boo study</title>
            <meta
                name="description"
                content="I hope you like it, boo.world"
            />
        </head>
        <Component {...pageProps} />
    </>) : (
        <LoginPage />
    );

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
