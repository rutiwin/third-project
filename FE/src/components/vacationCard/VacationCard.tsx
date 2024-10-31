import React, { useContext } from 'react';
import { VacationModel } from '../../models/VacationModel';
import { FaCalendarAlt, FaHeart } from 'react-icons/fa';
import './VacationCard.css';
import Like from '../cardActions/Like';
import EditAndDelete from '../cardActions/EditAndDelete';
import { UserContext } from '../AppRoutes';

type Props = {
    vacation: VacationModel;
};

const VacationCard = (props: Props) => {
    const userContext = useContext(UserContext);
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}.${month}.${year}`;
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="image-placeholder">
                    <img src={`http://localhost:4700/assets/images/${props.vacation.imageFileName}`} alt={props.vacation.destination} className="card-img-top" />
                    {!userContext?.user?.isAdmin ? <Like vacation={props.vacation} /> : <EditAndDelete vacation={props.vacation} />}
                    <h5 style={{ color: 'white' }} className="card-title">{props.vacation.destination}</h5>
                </div>
                <div className="date-container">
                    <FaCalendarAlt className="calendar-icon" /> {/* אייקון לוח שנה */}
                    <span className="card-dates">{formatDate(props.vacation.startDate)} - {formatDate(props.vacation.endDate)}</span>
                </div>
                <div className="card-body">
                    <p className="card-text description">{props.vacation.description}</p>
                    <p className="card-price">${props.vacation.price}</p>
                </div>
            </div>
        </div>
    );
};

export default VacationCard;