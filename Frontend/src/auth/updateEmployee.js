import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetOneUserApiCall } from '../services/usersApi';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { Box, Button, Grid, TextField, Typography, Modal } from '@mui/material';
import { UpdateUserApiCall } from '../services/usersApi';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { RoleName } from '../model/RoleName';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderTop : '10px solid #000',
    boxShadow: 24,
    p: 4
};

function UpdateEmployee(props) {

    let { eId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState();

    useEffect(() => {
        GetOneUserApiCall(eId).then(async (result) => { await setUser(result); }).catch((err) => { console.log(err) });
      },[]);

    

    const validationSchema = Yup.object({
        name: Yup.string().max(255).required("Name is required"),
        email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
        phoneNo: Yup.string().required("Phone Number is required"),
        address: Yup.string().required("Address is required"),
        password: Yup.string()
            .required("Password is required")
            .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        department: Yup.string().required("Department Number is required"),
        role: Yup.string().required("Role Number is required"),
        // dob: Yup.date().required("Birthdate is required"),
        // doj: Yup.date().required("Date Of Join is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
    });


    return (<>

        <Modal open={1} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style} className="popup-model">
                <div>{!user && 'Loding...'}</div>

                {
                    user && <>
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4" className='Header' > {user.role} : {user.userId} </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2" > Edit Details </Typography>
                        </Box>
                        <Formik
                            initialValues={user && {
                                name: user.name,
                                email: user.email,
                                phoneNo: user.phoneNo,
                                address: user.address,
                                password: user.password,
                                department: user.department,
                                role: user.role,
                                //dob: user.dob,
                                //doj: user.doj,
                                city: user.city,
                                state: user.state,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                console.log("data");
                                console.log(values);

                                values = {
                                    eId : eId,
                                    name: values.name,
                                    email: values.email,
                                    phoneNo: values.phoneNo,
                                    address: values.address,
                                    password: values.password,
                                    department: values.department,
                                    role: values.role,
                                    // dob: values.dob,
                                    // doj: values.doj,
                                    city: values.city,
                                    state: values.state,

                                }

                                try {
                                    const res = await UpdateUserApiCall(eId, values);
                                    console.log(res)
                                    if (res.status === 204) {
                                        toast.success("sucssesfully updated");
                                        console.log(res.data);

                                        navigate('/auth/viewEmployee');
                                    }

                                } catch (err) {

                                    console.log(err.res.status);
                                    toast.error(err.message);
                                    console.log(err.message);
                                }



                            }}>
                            {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
                                <div>

                                    <Form>
                                        <Grid container spacing={2}>
                                            
                                        <Grid item xs={12} md={4}>
                                            {/* First Name */}
                                            <TextField
                                            error={Boolean(
                                                touched.name && errors.name
                                            )}
                                            fullWidth
                                            helperText={
                                                touched.name && errors.name
                                            }
                                            label="Name"
                                            margin="normal"
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name}
                                            variant="outlined"
                                            />
                                        </Grid>


                                        <Grid item xs={12} md={4}>
                                            {/* Email Address */}
                                            <TextField
                                            error={Boolean(touched.email && errors.email)}
                                            fullWidth
                                            helperText={touched.email && errors.email}
                                            label="Email Address"
                                            margin="normal"
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="email"
                                            value={values.Email}
                                            variant="outlined"
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            {/* Phone Number */}
                                            <TextField
                                            error={Boolean(
                                                touched.phoneNo && errors.phoneNo
                                            )}
                                            fullWidth
                                            helperText={touched.phoneNo && errors.phoneNo}
                                            label="Phone Number"
                                            margin="normal"
                                            name="phoneNo"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="text"
                                            value={values.phoneNo}
                                            variant="outlined"
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            {/* Address */}
                                            <TextField
                                            error={Boolean(
                                                touched.address && errors.address
                                            )}
                                            fullWidth
                                            helperText={touched.address && errors.address}
                                            label="Address"
                                            margin="normal"
                                            name="address"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.address}
                                            variant="outlined"
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            {/* Password */}
                                            <TextField
                                            error={Boolean(
                                                touched.password && errors.password
                                            )}
                                            fullWidth
                                            helperText={touched.password && errors.password}
                                            label="Password"
                                            margin="normal"
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="password"
                                            value={values.password}
                                            variant="outlined"
                                            />
                                            {/* <PasswordStrengthBar password={values.Password} /> */}
                                        </Grid>


                                        <Grid item xs={12} md={4}>
                                            {/* Department */}
                                            <TextField
                                            error={Boolean(
                                                touched.department && errors.department
                                            )}
                                            fullWidth
                                            helperText={touched.department && errors.department}
                                            label="Department"
                                            margin="normal"
                                            name="department"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.department}
                                            variant="outlined"
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            {/* Role*/}
                                            <TextField
                                            error={Boolean(
                                                touched.role && errors.role
                                            )}
                                            fullWidth
                                            helperText={touched.role && errors.role}
                                            label="Role"
                                            margin="normal"
                                            name="role"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.role}
                                            variant="outlined"
                                            />
                                        </Grid>

                                        {/* <Grid item xs={12} md={4} > */}
                                            {/* Date Of Birth */}
                                            {/* <TextField error={Boolean(touched.dob && errors.dob)} fullWidth helperText={touched.dob && errors.dob} label="Date Of Birth"
                                            margin="normal" name="dob" onBlur={handleBlur} onChange={handleChange} type="date" value={values.dob} variant="outlined"
                                            InputLabelProps={{ shrink: true }} />
                                        </Grid> */}

                                        {/* <Grid item xs={12} md={4} > */}
                                            {/* Date Of Join */}
                                            {/* <TextField error={Boolean(touched.doj && errors.doj)} fullWidth helperText={touched.doj && errors.doj} label="Date Of Join"
                                            margin="normal" name="doj" onBlur={handleBlur} onChange={handleChange} type="date" value={values.doj} variant="outlined"
                                            InputLabelProps={{ shrink: true }} />
                                        </Grid> */}

                                        <Grid item xs={12} md={4}>
                                            {/* City*/}
                                            <TextField
                                            error={Boolean(
                                                touched.city && errors.city
                                            )}
                                            fullWidth
                                            helperText={touched.city && errors.city}
                                            label="City"
                                            margin="normal"
                                            name="city"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.city}
                                            variant="outlined"
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            {/* State*/}
                                            <TextField
                                            error={Boolean(
                                                touched.state && errors.state
                                            )}
                                            fullWidth
                                            helperText={touched.state && errors.state}
                                            label="State"
                                            margin="normal"
                                            name="state"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.state}
                                            variant="outlined"
                                            />
                                        </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Box sx={{ py: 2, marginRight: '5px' }}>
                                                    {/* Submit btn */}
                                                    <Button color="primary" disabled={isSubmitting}  size="large" type="submit" variant="contained" sx={{ marginRight: '5px' }} >
                                                        Save
                                                    </Button>

                                                    <Button onClick={() => {
                                                        if (user.role === RoleName.STUDENT) navigate('/auth/allStudents');
                                                        else navigate('/auth/viewEmployee');
                                                    }}  size="large" variant="contained" color='error'>
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </>
                }
            </Box>
        </Modal>

    </>)
};

export default UpdateEmployee;