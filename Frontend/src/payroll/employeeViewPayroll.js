import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Backdrop, Box, Modal, Fade, Typography, TextField, Card, CardContent, TableContainer, TableBody, TableHead, TableRow, Paper, Table } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate } from "react-router";
import { GetEmployeePayrollApiCall } from '../services/payrollApi';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Navbar from '../component/navbar'
import { useSelector } from 'react-redux';


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

function ViewPayroll() {

    const user = useSelector(state => state.user);
    // console.log(user.user.eId);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [AllPayroll, SetAllPayroll] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    useEffect(() => {
        GetEmployeePayrollApiCall(user.user.eId).then(async (result) => { await SetAllPayroll(result); }).catch((err) => { console.log(err) });
      },[]);

    return (<>

        <Navbar activeLink = {'View Payroll'}/>
        <br />

        {AllPayroll.length === 0 ? <>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {AllPayroll.map((payroll) => (
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
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        }
        <br />
    </>
    )
}

export default ViewPayroll;
