import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/src/redux/reducer";
import { Friend } from "../friend";
import { Skeleton } from "antd";

export const FriendListWidget = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const friends = useSelector((state) => state.auth.user.friends) || [];
    const API_URL = 'https://server-ggc6w24fq-edustadler.vercel.app'

    const getFriends = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${API_URL}/users/${userId}/friends`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const data = await response.json();
            dispatch(setFriends({ friends: data }));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getFriends();
    }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div className="radius-30 overflow-hidden p-3 shadow-white">
                <p className="mb-4">Friends List: {friends.length} </p>
                {isLoading ? (
                    <>
                        <Skeleton active avatar paragraph={{ rows: 0 }} size={'large'} />
                    </>
                ) : (
                    Array.isArray(friends) &&
                    friends.map((friend) => (
                        <Friend
                            key={friend._id}
                            friendId={friend._id}
                            name={`${friend.firstName} ${friend.lastName}`}
                            subtitle={friend.occupation}
                            userPicturePath={friend.picturePath}
                        />
                    ))
                )}
            </div>
        </>
    )

}

