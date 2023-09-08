import { setFriends } from "@/src/redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { UserAvatar } from "../userAvatar";
import { Button } from "antd";
import { UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";
import variables from '@/src/styles/variable.module.scss'

export const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const friends = useSelector((state) => state.auth.user.friends) || [];

    const isFriend = friends.find((friend) => friend._id === friendId);
    const isNotOwnId = friendId !== _id;

    const API_URL = 'https://server-ggc6w24fq-edustadler.vercel.app'

    const patchFriend = async () => {
        try {
            const response = await fetch(
                `${API_URL}/users/${_id}/${friendId}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            dispatch(setFriends({ friends: data }));
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <>
            <div className="d-flex align-items-center test justify-content-between my-4">
                <div className="d-flex align-items-center gap-2">
                    <UserAvatar image={userPicturePath} />
                    <p>{name}</p>
                </div>
                {
                    isNotOwnId && (
                        <div
                            onClick={() => patchFriend()}
                            style={{
                                color: variables.secondColor,
                                cursor: 'pointer'
                            }}
                        >
                            {
                                isFriend ? (
                                    <UserDeleteOutlined style={{ color: variables.secondColor, fontSize: '1.65rem' }} />
                                ) : (
                                    <UserAddOutlined style={{ color: variables.secondColor, fontSize: '1.65rem' }} />
                                )
                            }
                        </div>
                    )
                }
            </div>
        </>
    )

}
