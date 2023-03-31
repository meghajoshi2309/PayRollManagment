import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import PasswordStrengthBar from "react-password-strength-bar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { RegisterApiCall } from '../services/usersApi';
import Navbar from '../component/navbar'

/**
 * Register model : to register user
 *
 */

const Register = () => {
  const navigate = useNavigate();

  // form controller
  const formik = useFormik({
    // intial values
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
      PhoneNo: "",
      Address: "",
      Department: "",
      Role: "",
      Dob: "",
      Doj: "",
      City: "",
      State: "",
    },

    // To check enter value is vaild or not
    validationSchema: Yup.object({
      Name: Yup.string().max(255).required("Name is required"),
      Email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      PhoneNo: Yup.string().required("Phone Number is required"),
      Address: Yup.string().required("Address is required"),
      Password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      Department: Yup.string().required("Department Number is required"),
      Role: Yup.string().required("Role Number is required"),
      Dob: Yup.date().required("Birthdate is required"),
      Doj: Yup.date().required("Date Of Join is required"),
      City: Yup.string().required("City is required"),
      State: Yup.string().required("State is required"),
    }),

    // for when click on submit button
    onSubmit: async (values) => {
      // set object to pass request of Backend url
      const requestuser = {
        Name: values.Name,
        Email: values.Email,
        PhoneNo: values.PhoneNo,
        Address: values.Address,
        Password: values.Password,
        Department: values.Department,
        Role: values.Role,
        Dob: values.Dob,
        Doj: values.Doj,
        City: values.City,
        State: values.State,
      };

      console.log(requestuser);

      try {
          // call to backend url
          const response = await RegisterApiCall(requestuser);

          console.log(response);
          //  status of respose
          if (response.status == 201) {
              //if (response.data.success === true) {
                  toast.success("Registered Successfully");
                  console.log(response.data.userId);
                  navigate('/auth/viewEmployee');
             // }
              //if (response.data.success === false) {
               //   toast.error(response.data.message);
              //}
          }

      } catch (err) {
          if (err.response.status === 401) {
              toast.error("Unauthorized");
              return;
          } else if (err.response.status === 404) {
              toast.error("Not Found");
              return;
          } if (err.response.status === 403) {
              toast.error("Forbidden");
              return;
          } else {
              toast.error("Some Thing Goes Wrong Try Again ");
              console.log(err);
          }
      }
    },
  });

  return (
    <>
      <Navbar activeLink = {'Add Employee'}/>
      <Box
        component="main"
        md={{ Width: "100%" }}
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                {" "}
                Register a new Employee{" "}
              </Typography>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                {/* First Name */}
                <TextField
                  error={Boolean(
                    formik.touched.Name && formik.errors.Name
                  )}
                  fullWidth
                  helperText={
                    formik.touched.Name && formik.errors.Name
                  }
                  label="Name"
                  margin="normal"
                  name="Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Name}
                  variant="outlined"
                />
              </Grid>


              <Grid item xs={12} md={4}>
                {/* Email Address */}
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
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Phone Number */}
                <TextField
                  error={Boolean(
                    formik.touched.PhoneNo && formik.errors.PhoneNo
                  )}
                  fullWidth
                  helperText={formik.touched.PhoneNo && formik.errors.PhoneNo}
                  label="Phone Number"
                  margin="normal"
                  name="PhoneNo"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.PhoneNo}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Address */}
                <TextField
                  error={Boolean(
                    formik.touched.Address && formik.errors.Address
                  )}
                  fullWidth
                  helperText={formik.touched.Address && formik.errors.Address}
                  label="Address"
                  margin="normal"
                  name="Address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Address}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Password */}
                <TextField
                  error={Boolean(
                    formik.touched.Password && formik.errors.Password
                  )}
                  fullWidth
                  helperText={formik.touched.Password && formik.errors.Password}
                  label="Password"
                  margin="normal"
                  name="Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="Password"
                  value={formik.values.Password}
                  variant="outlined"
                />
                <PasswordStrengthBar password={formik.values.Password} />
              </Grid>


              <Grid item xs={12} md={4}>
                {/* Department */}
                <TextField
                  error={Boolean(
                    formik.touched.Department && formik.errors.Department
                  )}
                  fullWidth
                  helperText={formik.touched.Department && formik.errors.Department}
                  label="Department"
                  margin="normal"
                  name="Department"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Department}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Role*/}
                <TextField
                  error={Boolean(
                    formik.touched.Role && formik.errors.Role
                  )}
                  fullWidth
                  helperText={formik.touched.Role && formik.errors.Role}
                  label="Role"
                  margin="normal"
                  name="Role"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Role}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4} >
                {/* Date Of Birth */}
                <TextField error={Boolean(formik.touched.Dob && formik.errors.Dob)} fullWidth helperText={formik.touched.Dob && formik.errors.Dob} label="Date Of Birth"
                  margin="normal" name="Dob" onBlur={formik.handleBlur} onChange={formik.handleChange} type="date" value={formik.values.Dob} variant="outlined"
                  InputLabelProps={{ shrink: true }} />
              </Grid>

              <Grid item xs={12} md={4} >
                {/* Date Of Join */}
                <TextField error={Boolean(formik.touched.Doj && formik.errors.Doj)} fullWidth helperText={formik.touched.Doj && formik.errors.Doj} label="Date Of Join"
                  margin="normal" name="Doj" onBlur={formik.handleBlur} onChange={formik.handleChange} type="date" value={formik.values.Doj} variant="outlined"
                  InputLabelProps={{ shrink: true }} />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* City*/}
                <TextField
                  error={Boolean(
                    formik.touched.City && formik.errors.City
                  )}
                  fullWidth
                  helperText={formik.touched.City && formik.errors.City}
                  label="City"
                  margin="normal"
                  name="City"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.City}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* State*/}
                <TextField
                  error={Boolean(
                    formik.touched.State && formik.errors.State
                  )}
                  fullWidth
                  helperText={formik.touched.State && formik.errors.State}
                  label="State"
                  margin="normal"
                  name="State"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.State}
                  variant="outlined"
                />
              </Grid>

            
            </Grid>

            <Box sx={{ py: 2 }}>
              {/* Submit btn */}
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </Box>
          </form>
        </Container>
      </Box>

      {/* for expanding length */}
      <Box
        component="main"
        md={{ Width: "100%", height: "50px" }}
        sx={{ height: "100px" }}
      ></Box>
    </>
  );
};

export default Register;
