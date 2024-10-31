import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import './AddDeleteEditModals.css';
import { VacationModel } from '../../models/VacationModel';
import { toast } from 'react-toastify';

type Props = {
    show: boolean;
    handleClose: () => void;
    handleSubmit: (vacationData: FormData) => void;
    vacation: VacationModel;
}

const EditVacationModal = (props: Props) => {
    const [destination, setDestination] = useState(props.vacation.destination);
    const [description, setDescription] = useState(props.vacation.description);
    const [startDate, setStartDate] = useState(new Date(new Date(props.vacation.startDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // המרת התאריך לפורמט YYYY-MM-DD
    const [endDate, setEndDate] = useState(new Date(new Date(props.vacation.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // הוספת יום לתאריך סיום
    const [price, setPrice] = useState(props.vacation.price);
    const [image, setImage] = useState<File>();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Field validations
        if (!destination || !description || !startDate || !endDate || !price) {
            toast.error("All fields are mandatory.");
            return;
        }

        // Price validation
        const priceValue = Number(price);
        if (priceValue < 0 || priceValue > 10000) {
            toast.error("Price must be between 0 and 10,000.");
            return;
        }

        if (endDate < startDate) {
            toast.error("End date cannot be earlier than the start date.");
            return;
        }

        // Prepare form data if validations pass
        const vacationData = new FormData();
        vacationData.append('destination', destination);
        vacationData.append('description', description);
        vacationData.append('startDate', startDate);
        vacationData.append('endDate', endDate);
        vacationData.append('price', String(priceValue));
        if (image) {
            vacationData.append('image', image);
        }

        props.handleSubmit(vacationData);
        props.handleClose(); // סגירת המודל לאחר ההגשה
        toast.success("Vacation updated successfully!");
    };

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose} dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title className='modal-title'>Edit Vacation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit} className='modal-form'>
                        <Form.Group className='input-container' controlId="formDestination">
                            <Form.Label>Destination</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='input-container' controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='input-container' controlId="formStartDate">
                            <Form.Label>Start On</Form.Label>
                            <Form.Control
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='input-container' controlId="formEndDate">
                            <Form.Label>End On</Form.Label>
                            <Form.Control
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='input-container' controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group className='input-container' controlId="formImage">
                            <Form.Label>Cover Image</Form.Label>
                            <div className="image-container">
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt="Preview" className="modal-img" />
                                ) : (
                                    <img src={`http://localhost:4700/assets/images/${props.vacation.imageFileName}`} alt={props.vacation.destination} className="modal-img" />
                                )}
                                <label className="custom-upload-button">
                                    Change Image
                                    <input
                                        type="file"
                                        className="upload-image-input"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            if (e.target.files) {
                                                setImage(e.target.files[0]);
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                        </Form.Group>

                        <div className='modal-footer'>
                            <Button className='cancel-button' variant="secondary" onClick={props.handleClose}>
                                Cancel
                            </Button>
                            <Button className='submit-button' variant="primary" type="submit">
                                Update
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditVacationModal;