import React, { useContext, useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Avatar, Grid, Dialog, DialogContent } from '@mui/material';
import { UserDataContext } from '../authentication/userDataProvide';
import { toast } from 'react-toastify';

const Profile = () => {
    const { userData } = useContext(UserDataContext);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
        return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <Typography variant="h4" gutterBottom>Profile</Typography>
            <Grid container spacing={2} sx={{ width: '80%' }}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar 
                                sx={{ width: 100, height: 100, cursor: 'pointer' }} 
                                src={userData.picture_path} 
                                alt={userData.employee_first_name} 
                                onClick={handleClickOpen}
                            />
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                {userData.employee_first_name} {userData.employee_last_name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {userData.employee_position}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {userData.employee_branch_name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {userData.section_name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Profile Information</Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Employee ID"
                                defaultValue={userData.employee_id}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="First Name"
                                defaultValue={userData.employee_first_name}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Last Name"
                                defaultValue={userData.employee_last_name}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Position"
                                defaultValue={userData.employee_position}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Status"
                                defaultValue={userData.employee_status}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Role"
                                defaultValue={userData.employee_role}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Branch Name"
                                defaultValue={userData.employee_branch_name}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Section Name"
                                defaultValue={userData.section_name}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Branch ID"
                                defaultValue={userData.employee_branch_id}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Branch ID"
                                defaultValue={userData.branch_section_id}
                                InputProps={{ readOnly: true }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                    <Avatar 
                        sx={{ width: 400, height: 400 }} 
                        src={userData.picture_path} 
                        alt={userData.employee_first_name}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                    >
                        Change Picture
                        <input
                            type="file"
                            hidden
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const formData = new FormData();
                                    formData.append('employeeId', userData.employee_id);
                                    formData.append('profileImg', file);
                                    const token = localStorage.getItem('token');
                                    const myHeaders = new Headers();
                                    myHeaders.append("Authorization", `Bearer ${token}`);
                                    try {
                                        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/changeEmployeePicture`, {
                                            method: 'PATCH',
                                            body: formData,
                                        });

                                        const result = await response.json();
                                        if (result.status === 'success') {
                                            // Handle successful response
                                            console.log('Picture updated successfully');
                                            toast.success("Picture updated successfully");
                                            handleClose();
                                        } else {
                                            // Handle error response
                                            console.error('Failed to update picture');
                                            toast.error("Failed to update picture");
                                        }
                                    } catch (error) {
                                        console.error('Error:', error);
                                        toast.error("Failed to update picture");
                                    }
                                }
                            }}
                        />
                    </Button>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Profile;
