import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { PostLeaveApiCall } from '../services/leaveApi';
import { useSelector } from 'react-redux';
import Navbar from '../component/navbar'


const LeaveRequest = () => {
  const navigate = useNavigate();

  const user = useSelector(state => state.user);
  console.log(user.user.eId);

  // form controller
  const formik = useFormik({
    // intial values
    initialValues: {
      eId: "",
      fromDate: "",
      toDate: "",
      days: "",
      reasone: "",
    },

    // To check enter value is vaild or not
    validationSchema: Yup.object({
      reasone: Yup.string().max(255).required("reasone is required"),
      days: Yup.string().required("days are required"),
      fromDate: Yup.date().required("fromDate is required"),
      toDate: Yup.date().required("toDate is required"),
    }),

    // for when click on submit button
    onSubmit: async (values) => {
      // set object to pass request of Backend url
      // console.log(user.eId);
      const requestBody = {
        eId: user.user.eId,
        reason: values.reasone,
        days: parseInt(values.days),
        fromDate: values.fromDate,
        toDate: values.toDate,
      };

      console.log(requestBody);

      try {
          // call to backend url
          const response = await PostLeaveApiCall(requestBody);

          console.log(response);
          //  status of respose
          if (response.status === 201) {
              
                  toast.success("Leave Request Successfully");
                  console.log(response.data.userId);
                  navigate('/leave/employeeViewLeaveStatus');
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
      <Navbar activeLink = {'Generate Leave Report'}/>
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
                Create a Leave Request{" "}
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {" "}
                {/* Use your email to create a new account{" "} */}
              </Typography>
            </Box>

            <Grid container spacing={1}>

              <Grid item xs={12} md={4} >
                {/* From Date */}
                <TextField error={Boolean(formik.touched.fromDate && formik.errors.fromDate)} fullWidth helperText={formik.touched.fromDate && formik.errors.fromDate} label="From"
                  margin="normal" name="fromDate" onBlur={formik.handleBlur} onChange={formik.handleChange} type="date" value={formik.values.fromDate} variant="outlined"
                  InputLabelProps={{ shrink: true }} />
              </Grid>

              <Grid item xs={12} md={4} >
                {/* Date Of Join */}
                <TextField error={Boolean(formik.touched.toDate && formik.errors.toDate)} fullWidth helperText={formik.touched.toDate && formik.errors.toDate} label="To"
                  margin="normal" name="toDate" onBlur={formik.handleBlur} onChange={formik.handleChange} type="date" value={formik.values.toDate} variant="outlined"
                  InputLabelProps={{ shrink: true }} />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* days*/}
                <TextField
                  error={Boolean(
                    formik.touched.days && formik.errors.days
                  )}
                  fullWidth
                  helperText={formik.touched.days && formik.errors.days}
                  label="days"
                  margin="normal"
                  name="days"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.days}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* reasone*/}
                <TextField
                  error={Boolean(
                    formik.touched.reasone && formik.errors.reasone
                  )}
                  fullWidth
                  helperText={formik.touched.reasone && formik.errors.reasone}
                  label="reasone"
                  margin="normal"
                  name="reasone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.reasone}
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
                Make A Request
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

export default LeaveRequest;
