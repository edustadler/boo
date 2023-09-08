import { Avatar } from "antd"
import variables from '@/src/styles/variable.module.scss'



export const UserAvatar = ({ image }) => {

    const apiKey = process.env.BASE_URL;

    return (
        <>
            <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 50, xl: 60, xxl: 80 }}
                src={`${image}`}
                alt="User"
                style={{backgroundColor: variables.secondColor}}

            />
        </>
    )
}