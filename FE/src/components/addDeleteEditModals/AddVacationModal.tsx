import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import './AddDeleteEditModals.css';
import { toast } from 'react-toastify';
import { FaRegImage } from 'react-icons/fa';

type Props = {
    show: boolean;
    handleClose: () => void;
    handleSubmit: (vacationData: FormData) => void;
}

const AddVacationModal = (props: Props) => {
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const resetForm = () => {
        setDestination('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setPrice('');
        setImage(null);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Field validations
        if (!destination || !description || !startDate || !endDate || !price || !image) {
            toast.error("All fields are mandatory.");
            return;
        }

        // Price validation
        const priceValue = Number(price);
        if (priceValue < 0 || priceValue > 10000) {
            toast.error("Price must be between 0 and 10,000.");
            return;
        }

        // Date validation
        const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        if (startDate < today) {
            toast.error("Start date cannot be in the past.");
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

        // Submit data
        props.handleSubmit(vacationData);
        resetForm();
        props.handleClose();
        toast.success("Vacation added successfully!");
    };

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose} dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title className='modal-title'>Add Vacation</Modal.Title>
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
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='input-container' controlId="formImage">
                            <Form.Label>Cover Image</Form.Label>
                            <div className="image-container image-icon-container">
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt="Preview" className="modal-img" />
                                ) : (
                                    <FaRegImage className='image-icon' />
                                )}
                                <label className="custom-upload-button">
                                    Select Image
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
                                Add Vacation
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddVacationModal;