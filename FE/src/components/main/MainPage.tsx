import React, { useContext, useEffect, useState } from 'react';
import './MainPage.css';
import VacationList from '../vacationList/VacationList';
import { addVacation, getAllVacations } from '../../client/vacationsApi';
import { getToken } from '../../client/authApi';
import { useNavigate } from 'react-router-dom';
import { UserContext, VacationsContext } from '../AppRoutes';
import CheckboxesFilters from '../checkboxesFilters/CheckboxesFilters';
import AddVacationModal from '../addDeleteEditModals/AddVacationModal';
import { toast } from 'react-toastify';

const MainPage = () => {
    const [showAddVacationModal, setShowAddVacationModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const vacationContext = useContext(VacationsContext);
    const userContext = useContext(UserContext);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate('/login');
        } else {
            getAllVacations(token, vacationContext?.currentPage || 1, vacationContext?.filters) 
                .then(data => {
                    vacationContext?.setVacations(data.vacations);
                    vacationContext?.setTotalPages(data.totalPages);
                })
                .catch(error => {
                    console.error("Failed to fetch vacations:", error);
                    navigate('/login');
                });
        }
    }, [navigate, vacationContext?.currentPage, vacationContext?.filters]);

    const handlePageChange = (page: number) => {
        vacationContext?.setCurrentPage(page);
    };

    const handleFilterChange = (newFilters: { followed: boolean, upcoming: boolean, active: boolean }) => {
        vacationContext?.setFilters(newFilters);
    };

    const handleAddVacationClick = () => {
        setShowAddVacationModal(true);
    };

    const handleAddVacationSubmit = async (vacationData: FormData) => {
        try {
            const token = getToken() as string;
            await addVacation(vacationData, token);
                        
            // Fetch updated vacation list after adding a vacation
            const data = await getAllVacations(token, vacationContext?.currentPage || 1, vacationContext?.filters);
            vacationContext?.setVacations(data.vacations);
            vacationContext?.setTotalPages(data.totalPages);
            } catch (error) {
            console.error("Error adding vacation:", error);
            toast.error("Failed to add vacation!");
        }
    };

    return (
        <div className='body-container'>
            {!userContext?.user?.isAdmin && <CheckboxesFilters onFilterChange={handleFilterChange} />}
            {userContext?.user?.isAdmin && <div className="d-grid gap-2 col-8 mx-auto admin-btn-container">
                <button className="btn btn-primary admin-btn" type="button" onClick={handleAddVacationClick}>Click here to add a new vacation</button>
                <button className="btn btn-primary admin-btn" type="button" onClick={() => navigate('/vacation-report')}>Go to the View Vacation Report page</button>
            </div>}
            <VacationList />
            <AddVacationModal show={showAddVacationModal} handleClose={() => setShowAddVacationModal(false)} handleSubmit={handleAddVacationSubmit} />
            <div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {Array.from({ length: vacationContext?.totalPages || 0 }, (_, index) => (
                            <li className={`page-item ${vacationContext?.currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                <a className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default MainPage;