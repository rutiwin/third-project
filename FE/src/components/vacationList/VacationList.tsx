import React, { useContext, useEffect, useState } from 'react';
import VacationCard from '../vacationCard/VacationCard';
import { getUserDetails } from '../../client/authApi';
import { UserModel } from '../../models/UserModel';
import { VacationsContext } from '../AppRoutes';

type Props = {};

const VacationList = (props: Props) => {
    const user: UserModel | null = getUserDetails();

    const vacationContext = useContext(VacationsContext);

    return (
        <div className="container">
            <div className="row">
                {user && vacationContext?.vacations.map((vacation) => (
                    <VacationCard key={`${vacation.vacationId}-${vacation.destination}`} vacation={vacation} />
                ))}
            </div>
        </div>
    );
};

export default VacationList;