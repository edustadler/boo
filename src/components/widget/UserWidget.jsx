import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserAvatar } from "../userAvatar";
import variables from '@/src/styles/variable.module.scss'
import { Divider } from "antd";
import { EnvironmentOutlined, ShoppingOutlined } from "@ant-design/icons";

export const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const friends = useSelector((state) => state.auth.user.friends);
    const API_URL = 'https://server-ggc6w24fq-edustadler.vercel.app'

    const getUser = async () => {

        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, [friends]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
    } = user;

    return (
        <>
            <div className="radius-30 overflow-hidden p-3 shadow-white" style={{ width: '100%' }}>
                <div className="d-flex align-items-center gap-3">
                    <UserAvatar image={picturePath} />
                    <div>
                        <p style={{ color: variables.secondColor }}>Hey, {firstName} {lastName}</p>
                        <p style={{ color: variables.mainColor }}>{friends.length} friends</p>
                    </div>
                </div>
                <Divider orientation="center" style={{ background: variables.mainColor }} />
                <div className="d-flex align-items-center gap-3 mb-2">
                    <EnvironmentOutlined style={{ fontSize: '1.25rem', color: variables.mainColor }} />
                    <p style={{ color: variables.secondColor }}>{location}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <ShoppingOutlined style={{ fontSize: '1.25rem', color: variables.mainColor }} />
                    <p style={{ color: variables.secondColor }}>{occupation}</p>
                </div>
                <Divider orientation="center" style={{ background: variables.mainColor }} />
                <div className="d-flex align-items-center gap-3">
                    <p style={{ color: variables.mainColor }}>Profile Viewers: <span style={{ color: variables.secondColor }}>{viewedProfile}</span></p>
                </div>
            </div>
        </>
    )
}