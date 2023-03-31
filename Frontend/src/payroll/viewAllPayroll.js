import React, { useState, useEffect } from 'react';
// import { AllStudentsApiCall } from '../services/userApis';
import { Link } from 'react-router-dom';
import { Button, Backdrop, Box, Modal, Fade, Typography, TextField, Card, CardContent, TableContainer, TableBody, TableHead, TableRow, Paper, Table } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate } from "react-router";
import { GetAllPayrollApiCall , DeletePayrollApiCall } from '../services/payrollApi';
import { toast } from 'react-toastify';
import Navbar from '../component/navbar'
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function ViewAllPayroll() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [AllPayRoll, SetAllPayRoll] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [deletePayroll, SetDeletePayroll] = useState({});
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDisableDeleteBtn, SetisDisableDeleteBtn] = useState(1);

    const handleOpen = () => setOpen(true);

    const handleChange = (event) => {
        if (event.target.value === deletePayroll.payRollId.toString()) {
            SetisDisableDeleteBtn(0);
        } else {
            SetisDisableDeleteBtn(1);
        }
    }

    const DeletePayrollIdCall = async (payroll) => {
        console.log('deleted payroll');

        try {
            const res = await DeletePayrollApiCall(payroll.payRollId);

            if (res.status === 204) {
                toast.success(res.data);
                console.log(res.data);
                SetDeletePayroll({});
                setOpen(false);
                SetisDisableDeleteBtn(1);
                navigate('/payroll/viewAllPayroll');
                window.location.reload();
            }
        } catch (err) {

            console.log(err.res.status);
            toast.error(err.message);
            console.log(err.message);
        }


    }

    useEffect(() => {
        GetAllPayrollApiCall().then(async (result) => { await SetAllPayRoll(result); }).catch((err) => { console.log(err) });
      },[]);

    

    return (<>
        <Navbar  activeLink='Manage Payroll'/>
        <br />

        {AllPayRoll.length === 0 ? <>
            <Box sx={{ display: 'flex', marginLeft: '50%' }}>
                <CircularProgress />
            </Box>
        </> :
            <>
                <TableContainer component={Paper}sx={{ margin: '20px' , width: '97%' }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Payroll Id</StyledTableCell>
                                <StyledTableCell>Employee Id</StyledTableCell>
                                <StyledTableCell align="right">No of Leave In This Month</StyledTableCell>
                                <StyledTableCell align="right">Monthly Salary</StyledTableCell>
                                <StyledTableCell align="right">Yearly Salary</StyledTableCell>
                                <StyledTableCell align="right">Cash In Advance</StyledTableCell>
                                <StyledTableCell align="right">Tex</StyledTableCell>
                                <StyledTableCell align="right">Net Payment</StyledTableCell>
                                <StyledTableCell align="right">Month Of Payroll</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {AllPayRoll.map((payroll) => (
                                <StyledTableRow key={payroll.eId}>
                                    <StyledTableCell component="th" scope="row"> {payroll.payRollId} </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">{payroll.eId}</StyledTableCell>
                                    <StyledTableCell align="right">{payroll.noOfLeaveInThisMonth}</StyledTableCell>
                                    <StyledTableCell align="right">{payroll.monthlySalary}</StyledTableCell>
                                    <StyledTableCell align="right">{payroll.yearlySalary}</StyledTableCell>
                                    <StyledTableCell align="right">{payroll.cashInAdvance}</StyledTableCell>
                                    <StyledTableCell align="right">{payroll.tex}</StyledTableCell>
                                    <StyledTableCell align="right">{payroll.netPayment}</StyledTableCell>
                                    <StyledTableCell align="right">{payroll.monthOfPayroll}</StyledTableCell>
                                    <StyledTableCell align="right"> <Button onClick={() => { navigate('/payroll/updatePayroll/' + payroll.payRollId) }} variant="contained" sx={{ marginRight: '5px' }}>
                                        Edit
                                    </Button></StyledTableCell>
                                    <StyledTableCell> <Button onClick={() => { SetDeletePayroll(payroll); handleOpen(); }} variant="contained" color='error' sx={{ marginRight: '5px' }}>
                                        Delete
                                    </Button></StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        }
        <br />

        <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open}
            closeAfterTransition BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500, }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Drop Payroll
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>

                        To drop the Employee <b>{deletePayroll.payRollId}</b>, type the UserId to confirm.
                        <br />

                        <TextField
                            // error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                            fullWidth
                            label="Enter UserId"
                            margin="normal"
                            name="eId"
                            onChange={handleChange}
                            variant="outlined"
                        />

                        <br />

                        <Button onClick={() => { DeletePayrollIdCall(deletePayroll); }} variant="contained" color='error' disabled={isDisableDeleteBtn} sx={{ marginRight: '5px' }}>
                            Delete
                        </Button>
                        <Button onClick={() => { SetDeletePayroll({}); setOpen(false); SetisDisableDeleteBtn(1); }} variant="contained" sx={{ color: '#fafafa' }}>
                            Cancle
                        </Button>

                    </Typography>
                </Box>
            </Fade>
        </Modal>
    </>
    )
}

export default ViewAllPayroll;
