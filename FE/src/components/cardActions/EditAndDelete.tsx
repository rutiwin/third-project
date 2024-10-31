import React, { useState, useEffect, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './CardActions.css';
import { VacationModel } from '../../models/VacationModel';
import { getToken } from '../../client/authApi';
import { deleteVacation, getAllVacations, updateVacation } from '../../client/vacationsApi';
import { VacationsContext } from '../AppRoutes';
import DeleteVacationModal from '../addDeleteEditModals/DeleteVacationModal';
import EditVacationModal from '../addDeleteEditModals/EditVacationModal';
import { toast } from 'react-toastify';

type Props = {
    vacation: VacationModel,
}

const EditAndDelete = (props: Props) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const vacationContext = useContext(VacationsContext);

    const handleEditClick = async () => {
        setShowEditModal(true);
    };

    const confirmEdit = async (vacationData: FormData) => {
        try {
            const token = getToken() as string;
            await updateVacation(props.vacation.vacationId, vacationData, token);
    
            // Refetch vacations after editing
            const data = await getAllVacations(token, vacationContext?.currentPage || 1, vacationContext?.filters);
            vacationContext?.setVacations(data.vacations);
            vacationContext?.setTotalPages(data.totalPages);
    
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating vacation:", error);
            toast.error("Failed to update vacation!");
        }
    };
    

    const cancelEdit = () => {
        setShowEditModal(false);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const token = getToken() as string;
            await deleteVacation(props.vacation.vacationId, token);

            // Remove the deleted vacation from the list in context
            vacationContext?.setVacations(vacationContext.vacations.filter(vacation => vacation.vacationId !== props.vacation.vacationId));

            setShowDeleteModal(false);
            toast.success("Vacation deleted successfully!");
        } catch (error) {
            console.error("Error delete vacation status:", error);
            toast.error("Failed to delete vacation!");
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    return (
        <div>
            <button className={`edit`} style={{ border: 'none' }} onClick={handleEditClick}>
                <FaEdit className='m-2' /> {/* אייקון עריכה */} Edit
            </button>
            <button className={`delete`} style={{ border: 'none' }} onClick={handleDeleteClick}>
                <FaTrash className='m-2' /> {/* אייקון מחיקה */} Delete
            </button>

            {showDeleteModal && <DeleteVacationModal show={showDeleteModal} handleClose={() => cancelDelete()} handleSubmit={confirmDelete} />}
            {showEditModal && <EditVacationModal show={showEditModal} handleClose={() => cancelEdit()} handleSubmit={confirmEdit} vacation={props.vacation} />}
        </div>
    )
}

export default EditAndDelete