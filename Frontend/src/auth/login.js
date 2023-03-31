import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/slices/userSlice';
import { LoginApiCall } from '../services/usersApi';


const login = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();

    // form controller
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formik = useFormik({
        // initial values
        initialValues: {
            Email: '',
            Password: ''
        },
        // To check enter value is vaild or not 
        validationSchema: Yup.object({
            Email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            Password: Yup.string().max(255).required('Password is required')
        }),

        // for when click on submit button  
        onSubmit: async (values) => {

            console.log("button click")
            // set object to pass request of Backend url
            const requestUserLogin = { 
                email: values.Email, 
                password: values.Password 
            };


            try {
                // call to backend url
                const response = await LoginApiCall(requestUserLogin);

                console.log(response);

                // status of response
                if (response != -1 && response != -2) {
                    let type1 = "Employee"
                    if(values.Email == "Admin@gmail.com")
                        type1 = "Admin"
                    let user1  = {user : response,
                                type : type1}
                    let userdataFormServer = user1;
                    dispatch(signIn(userdataFormServer));
                    console.log(userdataFormServer);
                    toast.success("Welcome" );
                    navigate('/');
                } else if (response == -1 || response == -2) {
                    toast.error("Email Or Password is Wrong");
                    return ;
                }else {
                    toast.error("Some Thing Goes Wrong Try Again ");
                }

            } catch (err) {
                console.log(err);
            }
        }
    });

    return (
        <>
            <Box component="main" sx={{ alignItems: 'center', display: 'flex', flexGrow: 1, minHeight: '100%' }} >
                <Container maxWidth="sm">
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4" > Sign in </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2" > Sign in to dashbord </Typography>
                        </Box>

                        {/* Email input */}
                        <TextField
                            error={Boolean(formik.touched.Email && formik.errors.Email)}
                            fullWidth
                            helperText={formik.touched.Email && formik.errors.Email}
                            label="Email Address"
                            margin="normal"
                            name="Email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="Email"
                            value={formik.values.Email}
                            variant="outlined"
                        />

                        {/* Password Input */}
                        <TextField
                            error={Boolean(formik.touched.Password && formik.errors.Password)}
                            fullWidth
                            helperText={formik.touched.Password && formik.errors.Password}
                            label="Password"
                            margin="normal"
                            name="Password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.Password}
                            variant="outlined"
                        />

                        {/* Submit Btn */}
                        <Box sx={{ py: 2 }}>
                            <Button color="primary" disabled={formik.isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                Sign In Now
                            </Button>
                        </Box>

                        <Grid container spacing={12} >
                            <Grid item xs={12} md={6}  >

                                {/* Link for sing up */}
                                <Typography color="textSecondary" variant="body2" > Don&apos;t have an account? {' '}
                                <br/>
                                    Contact To Adminitration

                                </Typography>
                            </Grid>

                        </Grid>
                    </form>
                </Container>
            </Box>

        </>
    )
}

export default login;
