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
import { CreatePayrollApiCall } from '../services/payrollApi';
import Navbar from '../component/navbar'



const LeaveRequest = () => {
  const navigate = useNavigate();

  // form controller
  const formik = useFormik({
    // intial values
    initialValues: {
      eId: "",
      noOfLeaveInThisMonth: "",
      monthlySalary: "",
      yearlySalary: "",
      cashInAdvance: "",
      tex:"",
      netPayment: "",
      monthOfPayroll: ""
    },

    // To check enter value is vaild or not
    validationSchema: Yup.object({
      eId: Yup.string().max(255).required("Employee Id is required"),
    //   noOfLeaveInThisMonth: Yup.string().max(255).required("reasone is required"),
      monthlySalary: Yup.string().required("Monthly Salary Is required"),
      yearlySalary: Yup.string().max(255).required("Yearly salary is required"),
    //   cashInAdvance: Yup.string().max(255).required("reasone is required"),
      tex: Yup.string().max(255).required("Tex Is required"),
      netPayment: Yup.string().max(255).required("NetPayment is required"),
      monthOfPayroll: Yup.string().max(255).required("Month Of Payroll is required"),
    }),

    // for when click on submit button
    onSubmit: async (values) => {
      // set object to pass request of Backend url
      // console.log(user.eId);
      const requestBody = {
        eId: values.eId,
        noOfLeaveInThisMonth: parseInt(values.noOfLeaveInThisMonth),
        monthlySalary: parseInt(values.monthlySalary),
        yearlySalary: parseInt(values.yearlySalary),
        cashInAdvance: parseInt(values.cashInAdvance),
        tex: parseInt(values.tex),
        netPayment: parseFloat(values.netPayment),
        monthOfPayroll: values.monthOfPayroll
      };

      console.log(requestBody);

      try {
          // call to backend url
          const response = await CreatePayrollApiCall(requestBody);

          //  status of respose
          if (response.status === 201) {
              
                  toast.success("Payroll Created Successfully");
                  console.log(response.data.userId);
                  navigate('/payroll/viewAllPayroll');
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
    <Navbar activeLink = {'Create Payroll'}/>
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
                Create a Payroll{" "}
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {" "}
                {/* Use your email to create a new account{" "} */}
              </Typography>
            </Box>

            <Grid container spacing={1}>

              <Grid item xs={12} md={4}>
                {/* Employee Id*/}
                <TextField
                  error={Boolean(
                    formik.touched.eId && formik.errors.eId
                  )}
                  fullWidth
                  helperText={formik.touched.eId && formik.errors.eId}
                  label="Employee Id"
                  margin="normal"
                  name="eId"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.eId}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* no Of Leave In This Month*/}
                <TextField
                  error={Boolean(
                    formik.touched.noOfLeaveInThisMonth && formik.errors.noOfLeaveInThisMonth
                  )}
                  fullWidth
                  helperText={formik.touched.noOfLeaveInThisMonth && formik.errors.noOfLeaveInThisMonth}
                  label="No Of Leave In This Month"
                  margin="normal"
                  name="noOfLeaveInThisMonth"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.noOfLeaveInThisMonth}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Monthly Salary*/}
                <TextField
                  error={Boolean(
                    formik.touched.monthlySalary && formik.errors.monthlySalary
                  )}
                  fullWidth
                  helperText={formik.touched.monthlySalary && formik.errors.monthlySalary}
                  label="Monthly Salary"
                  margin="normal"
                  name="monthlySalary"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.monthlySalary}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Yearly Salary*/}
                <TextField
                  error={Boolean(
                    formik.touched.yearlySalary && formik.errors.yearlySalary
                  )}
                  fullWidth
                  helperText={formik.touched.yearlySalary && formik.errors.yearlySalary}
                  label="Yearly Salary"
                  margin="normal"
                  name="yearlySalary"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.yearlySalary}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Cash In Advance*/}
                <TextField
                  error={Boolean(
                    formik.touched.cashInAdvance && formik.errors.cashInAdvance
                  )}
                  fullWidth
                  helperText={formik.touched.cashInAdvance && formik.errors.cashInAdvance}
                  label="Cash In Advance"
                  margin="normal"
                  name="cashInAdvance"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.cashInAdvance}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* tex*/}
                <TextField
                  error={Boolean(
                    formik.touched.tex && formik.errors.tex
                  )}
                  fullWidth
                  helperText={formik.touched.tex && formik.errors.tex}
                  label="tex"
                  margin="normal"
                  name="tex"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.tex}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* netPayment*/}
                <TextField
                  error={Boolean(
                    formik.touched.netPayment && formik.errors.netPayment
                  )}
                  fullWidth
                  helperText={formik.touched.netPayment && formik.errors.netPayment}
                  label="netPayment"
                  margin="normal"
                  name="netPayment"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.netPayment}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* monthOfPayroll */}
                <TextField
                  error={Boolean(
                    formik.touched.monthOfPayroll && formik.errors.monthOfPayroll
                  )}
                  fullWidth
                  helperText={formik.touched.monthOfPayroll && formik.errors.monthOfPayroll}
                  label="Month Of Payroll"
                  margin="normal"
                  name="monthOfPayroll"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.monthOfPayroll}
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
                Generate
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
