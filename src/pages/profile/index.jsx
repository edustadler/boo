import { UserAvatar } from "@/src/components/userAvatar";

export default function Profile({ userId }) {
    return (
        <>
            <h1>Profile Page for userId: {userId}</h1>
            <UserAvatar/>

        </>
    );
}