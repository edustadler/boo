import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "@/src/redux/reducer";
import { Friend } from "../friend";
import Image from "next/image";
import { Badge, Button, Divider } from "antd";
import { CommentOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons";
import variables from '@/src/styles/variable.module.scss'




export const PostWidget = ({ postId, postUserId, name, description, location, picturePath, userPicturePath, likes, comments }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const loggedInUserId = useSelector((state) => state.auth.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const API_URL = 'https://server-ggc6w24fq-edustadler.vercel.app'

    const patchLike = async () => {
        const response = await fetch(`${API_URL}/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    return (
        <>
            <div>
                <Friend
                    friendId={postUserId}
                    name={name}
                    subtitle={location}
                    userPicturePath={userPicturePath}
                />
                <p className="my-4">{description}</p>
                {
                    picturePath && (
                        <Image
                            width={100}
                            height={100}
                            alt="post"
                            src={picturePath}
                            style={{
                                width: '100%'
                            }}
                        />
                    )
                }
                <div className="d-flex gap-3 my-4">
                    <Badge count={likeCount} color={variables.orangeColor} style={{ color: variables.primaryColor }}>
                        <div onClick={patchLike} style={{ cursor: 'pointer' }}>
                            {
                                isLiked ? (
                                    <LikeFilled style={{ color: variables.mainColor, fontSize: '1.65rem', position: 'relative', bottom: '-.125rem' }} />
                                ) : (
                                    <LikeOutlined style={{ color: variables.secondColor, fontSize: '1.65rem', position: 'relative', bottom: '-.125rem' }} />
                                )
                            }
                        </div>
                    </Badge>
                    <Badge count={comments.length} color={variables.mainColor}>
                        <div onClick={() => setIsComments(!isComments)} style={{ cursor: 'pointer' }}>
                            <CommentOutlined style={{ color: variables.secondColor, fontSize: '1.65rem', position: 'relative', bottom: '-.125rem' }} />
                        </div>
                    </Badge>
                </div>
                <div>
                </div>
                {isComments && (
                    <div>
                        <p style={{color: variables.secondColor}}>Comments comming at the next tzup version!</p>
                        {/* {comments.map((comment, i) => (
                            <div key={`${name}-${i}`}>
                                <Divider />
                                <p>{comment}</p>
                            </div>
                        ))} */}
                        <Divider />
                    </div>
                )}
                {isComments && (
                    <div>
                        {comments.map((comment, i) => (
                            <div>
                                <Divider />
                                <p style={{color: variables.secondColor}}>
                                    {comment}
                                </p>
                            </div>
                        ))}
                        <Divider />
                    </div>
                )}
            </div>

        </>
    )
}