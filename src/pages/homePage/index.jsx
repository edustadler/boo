import React from "react";
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

export const config = {
    unstable_runtimeJS: false
}

export default function HomePage() {
    const user = useSelector((state) => state.auth.user);
    const { _id, picturePath } = user;
    const dispatch = useDispatch();


    const handleSignOut = () => {
        dispatch(setLogout());
    };

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
                <Image src={"https://boo.world/static/boo_text.svg"} width={60} height={60} style={{ filter: 'invert(98%) sepia(98%) saturate(0%) hue-rotate(108deg) brightness(104%) contrast(101%)' }} />
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
                    <PostsWidget userId={_id} />
                </article>
                <div className="w-25" style={{ color: variables.secondColor, background: variables.primaryColor }}>
                    <FriendListWidget userId={_id} />
                </div>
            </main>
        </>


    );
}