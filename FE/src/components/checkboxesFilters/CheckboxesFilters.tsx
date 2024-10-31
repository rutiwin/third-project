import React, { useState, useEffect } from 'react';
import './CheckboxesFilters.css';

type Props = {
    onFilterChange: (filters: { followed: boolean, upcoming: boolean, active: boolean }) => void; // הוספת סוג לפונקציה
}

const CheckboxesFilters = (props: Props) => {
    const [followed, setFollowed] = useState<boolean>(false);
    const [upcoming, setUpcoming] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);

    // Use useEffect to call onFilterChange whenever any filter changes
    useEffect(() => {
        props.onFilterChange({ followed, upcoming, active });
    }, [followed, upcoming, active]);

    return (
        <div className='filters-container'>
            <span className='filter-by'>
                Filter By:
            </span>
            <input className="form-check-input filter-input" type="checkbox" value="" id="followedFilter" checked={followed}
                onChange={(e) => {
                    setFollowed(e.target.checked);
                }} />
            <label className="form-check-label filter-label" htmlFor="followedFilter">
                Followed Vacations
            </label>
            <input className="form-check-input filter-input" type="checkbox" value="" id="upcomingFilter" checked={upcoming}
                onChange={(e) => {
                    setUpcoming(e.target.checked);
                }} />
            <label className="form-check-label filter-label" htmlFor="upcomingFilter">
                Upcoming Vacations
            </label>
            <input className="form-check-input filter-input" type="checkbox" value="" id="activeFilter" checked={active}
                onChange={(e) => {
                    setActive(e.target.checked);
                }} />
            <label className="form-check-label filter-label" htmlFor="activeFilter">
                Active Vacations
            </label>
        </div>
    )
}

export default CheckboxesFilters;