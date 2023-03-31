import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  GetOnePayrollApiCall,
  UpdatePayrollApiCall,
} from "../services/payrollApi";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormHelperText,
  Link,
  Grid,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderTop: "10px solid #000",
  boxShadow: 24,
  p: 4,
};

function UpdateEmployee(props) {
  let { PayrollId } = useParams();
  const navigate = useNavigate();

  const [Payroll, setPayroll] = useState();

  useEffect(() => {
    GetOnePayrollApiCall(PayrollId)
      .then(async (result) => {
        await setPayroll(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const validationSchema = Yup.object({
    eId: Yup.string().max(255).required("Employee Id is required"),
    //noOfLeaveInThisMonth: Yup.string().max(255).required("reasone is required"),
    monthlySalary: Yup.string().required("Monthly Salary Is required"),
    yearlySalary: Yup.string().max(255).required("Yearly salary is required"),
    //cashInAdvance: Yup.string().max(255).required("reasone is required"),
    tex: Yup.string().max(255).required("Tex Is required"),
    netPayment: Yup.string().max(255).required("NetPayment is required"),
    monthOfPayroll: Yup.string()
      .max(255)
      .required("Month Of Payroll is required"),
  });

  return (
    <>
      <Modal
        open={1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="popup-model">
          <div>{!Payroll && "Loding..."}</div>

          {Payroll && (
            <>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4" className="Header">
                  {" "}
                  Payroll Id : {Payroll.payRollId}{" "}
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  {" "}
                  Edit Details{" "}
                </Typography>
              </Box>
              <Formik
                initialValues={
                  Payroll && {
                    eId: Payroll.eId,
                    noOfLeaveInThisMonth: Payroll.noOfLeaveInThisMonth,
                    monthlySalary: Payroll.monthlySalary,
                    yearlySalary: Payroll.yearlySalary,
                    cashInAdvance: Payroll.cashInAdvance,
                    tex: Payroll.tex,
                    netPayment: Payroll.netPayment,
                    monthOfPayroll: Payroll.monthOfPayroll,
                  }
                }
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  console.log("data");
                  console.log(values);

                  values = {
                    payRollId: PayrollId,
                    eId: values.eId,
                    noOfLeaveInThisMonth: parseInt(values.noOfLeaveInThisMonth),
                    monthlySalary: parseInt(values.monthlySalary),
                    yearlySalary: parseInt(values.yearlySalary),
                    cashInAdvance: parseInt(values.cashInAdvance),
                    tex: parseInt(values.tex),
                    netPayment: parseFloat(values.netPayment),
                    monthOfPayroll: values.monthOfPayroll,
                  };

                  try {
                    const res = await UpdatePayrollApiCall(PayrollId, values);

                    if (res.status === 204) {
                      toast.success("sucssesfully updated");
                      console.log(res.data);
                      navigate("/payroll/viewAllPayroll");
                    }
                  } catch (err) {
                    console.log(err.res.status);
                    toast.error(err.message);
                    console.log(err.message);
                  }
                }}
              >
                {({
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  values,
                  isSubmitting,
                }) => (
                  <div>
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          {/* Employee Id*/}
                          <TextField
                            error={Boolean(touched.eId && errors.eId)}
                            fullWidth
                            helperText={touched.eId && errors.eId}
                            label="Employee Id"
                            margin="normal"
                            name="eId"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.eId}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {/* no Of Leave In This Month*/}
                          <TextField
                            error={Boolean(
                              touched.noOfLeaveInThisMonth &&
                                errors.noOfLeaveInThisMonth
                            )}
                            fullWidth
                            helperText={
                              touched.noOfLeaveInThisMonth &&
                              errors.noOfLeaveInThisMonth
                            }
                            label="No Of Leave In This Month"
                            margin="normal"
                            name="noOfLeaveInThisMonth"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.noOfLeaveInThisMonth}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {/* Monthly Salary*/}
                          <TextField
                            error={Boolean(
                              touched.monthlySalary && errors.monthlySalary
                            )}
                            fullWidth
                            helperText={
                              touched.monthlySalary && errors.monthlySalary
                            }
                            label="Monthly Salary"
                            margin="normal"
                            name="monthlySalary"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.monthlySalary}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {/* Yearly Salary*/}
                          <TextField
                            error={Boolean(
                              touched.yearlySalary && errors.yearlySalary
                            )}
                            fullWidth
                            helperText={
                              touched.yearlySalary && errors.yearlySalary
                            }
                            label="Yearly Salary"
                            margin="normal"
                            name="yearlySalary"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.yearlySalary}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {/* Cash In Advance*/}
                          <TextField
                            error={Boolean(
                              touched.cashInAdvance && errors.cashInAdvance
                            )}
                            fullWidth
                            helperText={
                              touched.cashInAdvance && errors.cashInAdvance
                            }
                            label="Cash In Advance"
                            margin="normal"
                            name="cashInAdvance"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.cashInAdvance}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {/* tex*/}
                          <TextField
                            error={Boolean(touched.tex && errors.tex)}
                            fullWidth
                            helperText={touched.tex && errors.tex}
                            label="tex"
                            margin="normal"
                            name="tex"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.tex}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {/* netPayment*/}
                          <TextField
                            error={Boolean(
                              touched.netPayment && errors.netPayment
                            )}
                            fullWidth
                            helperText={touched.netPayment && errors.netPayment}
                            label="netPayment"
                            margin="normal"
                            name="netPayment"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.netPayment}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {/* monthOfPayroll */}
                          <TextField
                            error={Boolean(
                              touched.monthOfPayroll && errors.monthOfPayroll
                            )}
                            fullWidth
                            helperText={
                              touched.monthOfPayroll && errors.monthOfPayroll
                            }
                            label="Month Of Payroll"
                            margin="normal"
                            name="monthOfPayroll"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.monthOfPayroll}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <Box sx={{ py: 2, marginRight: "5px" }}>
                            {/* Submit btn */}
                            <Button
                              color="primary"
                              disabled={isSubmitting}
                              size="large"
                              type="submit"
                              variant="contained"
                              sx={{ marginRight: "5px" }}
                            >
                              Save
                            </Button>

                            <Button
                              onClick={() => {
                                navigate("/payroll/viewAllPayroll");
                              }}
                              size="large"
                              variant="contained"
                              color="error"
                            >
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
          )}
        </Box>
      </Modal>
    </>
  );
}

export default UpdateEmployee;
