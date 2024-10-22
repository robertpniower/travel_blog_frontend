import React, { useEffect, useState } from 'react';
import { Typography, Avatar, Paper, Button, Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import SignUpModal from '../components/signUpModal';


const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:8000/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

const deleteUser = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/users/delete/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('User deleted:', data);
        return data;
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getUsers();
    }, []);

    const handleUpdate = (user) => {
        setCurrentUser(user);
        setIsSignUp(false); // Set to false to indicate it's in update mode
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            // Update the local state to remove the deleted user
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h3" gutterBottom align="center">
                Users
            </Typography>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">
                                    <Avatar
                                        src={user.avatar_url}
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: '50%',
                                            border: '2px solid blue'
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell align="left">{user.email}</TableCell>
                                <TableCell align="left">{user.role}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="success"
                                        sx={{ marginRight: 1.5 }}
                                        onClick={() => handleUpdate(user)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <SignUpModal
                showModal={showModal}
                setShowModal={setShowModal}
                isSignUp={isSignUp}
                user={currentUser}
            />
        </Paper>
    );
};

export default Users;
