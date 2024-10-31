import React, { useContext, useState } from 'react';
import { VacationModel } from '../../models/VacationModel';
import { FaHeart } from 'react-icons/fa';
import './CardActions.css';
import { followVacation, unfollowVacation } from '../../client/vacationsApi';
import { UserContext } from '../AppRoutes';
import { getToken } from '../../client/authApi';

type Props = { 
    vacation: VacationModel,
}

const Like = (props: Props) => {
    const [isFollowed, setIsFollowed] = useState(props.vacation.isFollowed);
    const userContext = useContext(UserContext);
    const [followersCount, setFollowersCount] = useState<number | undefined>(props.vacation.followersCount)

    const handleLikeClick = async () => {
        try {
            const token = getToken() as string;
            if (isFollowed) {
                await unfollowVacation(Number(userContext?.user?.userId), props.vacation.vacationId, token);
                setFollowersCount(prev => (prev ?? 0) - 1);
            } else {
                await followVacation(Number(userContext?.user?.userId), props.vacation.vacationId, token);
                setFollowersCount(prev => (prev ?? 0) + 1);
            }
            setIsFollowed(prev => !prev);
        } catch (error) {
            console.error("Error updating follow status:", error);
        }
    };

    return (
        <div>
            <button className={`likes ${isFollowed ? 'liked' : 'not-liked'}`} onClick={handleLikeClick} style={{ border: 'none'}}>
                <FaHeart className='m-2' /> {/* אייקון לב */} Likes {followersCount}
            </button>
        </div>
    )
}

export default Like;