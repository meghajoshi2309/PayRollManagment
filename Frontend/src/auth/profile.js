import React, { useState } from 'react';
import { Box, Button, FormHelperText, Link, Grid, TextField, Typography, InputLabel, FormControl, Select, MenuItem, Modal } from '@mui/material';
import { useNavigate } from "react-router";
// import { RoleName } from '../model/RoleName';
// import "../css/user/updateuser.css";
import { useSelector } from 'react-redux';
// import '../css/user/profile-picture.css';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderTop: '10px solid #000',
    boxShadow: 24,
    p: 4
};

function Profile() {

    const user = useSelector(state => state.user);

    return (
        <>
            <Modal open={1} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style} className="popup-model">

                    <Grid container spacing={2}>

                        <Grid item xs={12} md={6} className="logo-div" >
                            <div className='profile-logo'>  {user.user.name ? user.user.name[0] : 'C'} </div>
                            <Box sx={{ my: 3 }}>
                                <Typography color="textPrimary" variant="h6" className='Header' > {user.user.name} </Typography>
                            </Box>

                            <Link href="/">Back To Home</Link>
                        </Grid>

                        <Grid item xs={12} md={6} >
                            Phone_Number : {user.user.phoneNo} <hr />
                            Email : {user.user.email} <hr />
                        </Grid>

                    </Grid>

                </Box>
            </Modal>
        </>
    )
}

export default Profile;
