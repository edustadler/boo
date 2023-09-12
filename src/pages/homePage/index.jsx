import React, { useState, useCallback } from "react";
import { UserWidget } from "@/src/components/widget/UserWidget";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/src/redux/reducer";
import variables from '@/src/styles/variable.module.scss'
import Image from "next/image";
import { UserAvatar } from "@/src/components/userAvatar";
import { Input } from "antd";
import { MyPostWidget } from "@/src/components/widget/MyPostWidget";
import { PostsWidget } from "@/src/components/widget/PostsWidget";
import { FriendListWidget } from "@/src/components/widget/FriendListWidget";
import tzupLogo from '@/src/images/tzup-logo.svg'

export const config = {
    unstable_runtimeJS: false
}

export default function HomePage() {
    const [refreshKey, setRefreshKey] = useState(0);
    const user = useSelector((state) => state.auth.user);
    const { _id, picturePath } = user;
    const dispatch = useDispatch();


    const handleSignOut = () => {
        dispatch(setLogout());
    };

    const handleRefresh = useCallback(() => {
        setRefreshKey((prevKey) => prevKey + 1);
    }, []);

    if (!user) {
        return (
            <div className='d-flex justify-content-center align-items-center vh-100 w-100 flex-column' style={{ background: variables.primaryColor }}>
                <h1 className='mb-4' style={{ color: variables.secondColor }}>Your login has expired, please log in again.</h1>
                <Button style={{ height: 'auto' }} onClick={handleSignOut}>Logout</Button>
            </div>
        );
    }


    return (
        <>
            <nav className="p-4 pb-5 d-flex justify-content-between" style={{ background: variables.primaryColor }}>
                <Image src={tzupLogo} width={90} height={90} />
                <Button className="btn-logout" onClick={handleSignOut}>Logout</Button>
            </nav>
            <main className='w-100 d-flex justify-content-between flex-column-to-row px-4 gap-5' style={{ background: variables.primaryColor }}>
                <div className="w-25" style={{ background: variables.primaryColor }}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </div>
                <article className="w-50 mobile-order" style={{ color: variables.secondColor }}>
                    <div className="radius-30 overflow-hidden p-3 shadow-white">
                        <MyPostWidget picturePath={picturePath} />
                    </div>
                    <button className="mt-4 shadow-white overflow-hidden p-3" style={{border: 'none', borderRadius: '20px'}} onClick={handleRefresh}>Refresh Tzup</button>
                    <PostsWidget userId={_id} key={refreshKey} onComplete={() => setRefreshKey((prevKey) => prevKey)} />
                </article>
                <div className="w-25" style={{ color: variables.secondColor, background: variables.primaryColor }}>
                    <FriendListWidget userId={_id} />
                </div>
            </main>
        </>


    );
}
