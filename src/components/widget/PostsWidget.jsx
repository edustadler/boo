import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/src/redux/reducer";
import { PostWidget } from "./PostWidget"

export const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.auth.token);
    const posts = useSelector((state) => state.auth.posts);
    const API_URL = 'https://server-ggc6w24fq-edustadler.vercel.app'

    const getPosts = async () => {
        const response = await fetch(`${API_URL}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(
            `${API_URL}/posts/${userId}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };
    const reversedPosts = [...posts].reverse();

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {reversedPosts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <div className="radius-30 overflow-hidden p-3 shadow-white my-4">
                        <PostWidget
                            key={_id}
                            postId={_id}
                            postUserId={userId}
                            name={`${firstName} ${lastName}`}
                            description={description}
                            location={location}
                            picturePath={picturePath}
                            userPicturePath={userPicturePath}
                            likes={likes}
                            comments={comments}
                        />
                    </div>
                )
            )}
        </>
    )
}