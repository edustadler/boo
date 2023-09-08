import ProfilePage from './index';
import { useRouter } from 'next/router';

function ProfileID() {
    const router = useRouter();
    const { userId } = router.query;

    return (
        <ProfilePage userId={userId} />
    );
}

export default ProfileID;
