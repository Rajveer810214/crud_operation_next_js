'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editedUser, setEditedUser] = useState({});

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/allusers');
                setUsers(response.data.users);
            } catch (error) {
                setError('Error fetching users');
                console.error('Error fetching users:', error);
            }
        };

        fetchAllUsers();
    }, []);

    const handleEdit = (user) => {
        setEditedUser(user);
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/users/${editedUser._id}`, editedUser);
            console.log(response.data);
        } catch (error) {
            console.error('Error updating user:', error);
        }

        setShowModal(false);
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div >
            <h2>All Users</h2>
            {error && <p>{error}</p>}
            {users.length === 0 && !error && <p>No users found.</p>}
            {users.length > 0 && (
                <div >
                    <Table striped bordered hover>
                        <thead >
                            <tr>
                                <th >Name</th>
                                <th >Email</th>
                                <th style={{ background: 'black', color: 'white' }}>Phone</th>
                                <th style={{ background: 'black', color: 'white' }}>Hobbies</th>
                                <th style={{ background: 'black', color: 'white' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.firstname} {user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.hobbies}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleEdit(user)}>Edit</Button>
                                        <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter first name"
                                        value={editedUser.firstname}
                                        onChange={(e) => setEditedUser({ ...editedUser, firstname: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter last name"
                                        value={editedUser.lastname}
                                        onChange={(e) => setEditedUser({ ...editedUser, lastname: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email "
                                        value={editedUser.email}
                                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPhone">
                                    <Form.Label>phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter phone Number"
                                        value={editedUser.phone}
                                        onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formHobbies">
                                    <Form.Label>Hobbies</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your hobbies"
                                        value={editedUser.hobbies}
                                        onChange={(e) => setEditedUser({ ...editedUser, hobbies: e.target.value })}
                                    />
                                </Form.Group>
                                {/* Add more fields as needed */}
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default AllUsers;
