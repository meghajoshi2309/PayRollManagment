import React, { useState, useEffect } from 'react';
// import { AllStudentsApiCall } from '../services/userApis';
import { Link } from 'react-router-dom';
import { Button, Backdrop, Box, Modal, Fade, Typography, TextField, Card, CardContent, TableContainer, TableBody, TableHead, TableRow, Paper, Table } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate } from "react-router";
import { GetLeaveApiCall , updateLeaveApiCall } from '../services/leaveApi';
import { toast } from 'react-toastify';
// import Navbar from '../components/dashboard/navbar';
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

function ViewLeave() {

    const user = useSelector(state => state.user);
    console.log(user.user.eId);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [AllLeave, SetAllLeave] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    useEffect(() => {
        GetLeaveApiCall().then(async (result) => { await SetAllLeave(result); }).catch((err) => { console.log(err) });
      },[]);

    const updateLeave = (status,leave) => {
        const requestBody = {
            leaveId: leave.leaveId,
            eId : leave.eId,
            fromDate: leave.fromDate,
            toDate: leave.toDate,
            days: leave.days,
            reason: leave.reason,
            status: status
        }
        console.log(requestBody)
        updateLeaveApiCall(leave.leaveId,requestBody).then(console.log("update succses")).catch((err)=> { console.log(err) });
        GetLeaveApiCall().then(async (result) => { await SetAllLeave(result); }).catch((err) => { console.log(err) });
    }
    

    return (<>
        <Navbar  activeLink='View Leave Requests'/>
        <br />

        {AllLeave.length === 0 ? <>
            <Box sx={{ display: 'flex', marginLeft: '50%' }}>
                <CircularProgress />
            </Box>
        </> :
            <>
                <TableContainer component={Paper}sx={{ margin: '20px' , width: '97%' }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>LeaveId</StyledTableCell>
                                <StyledTableCell>Employee Id</StyledTableCell>
                                <StyledTableCell align="right">From</StyledTableCell>
                                <StyledTableCell align="right">To</StyledTableCell>
                                <StyledTableCell align="right">Days</StyledTableCell>
                                <StyledTableCell align="right">Reason</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {AllLeave.map((leave) => (
                                <StyledTableRow key={leave.leaveId}>
                                    <StyledTableCell component="th" scope="row"> {leave.leaveId} </StyledTableCell>
                                    <StyledTableCell component="th" scope="row"> {leave.eId} </StyledTableCell>
                                    <StyledTableCell align="right">{new Date(leave.fromDate).toLocaleDateString()}</StyledTableCell>
                                    <StyledTableCell align="right">{new Date(leave.toDate).toLocaleDateString()}</StyledTableCell>
                                    <StyledTableCell align="right">{leave.days}</StyledTableCell>
                                    <StyledTableCell align="right">{leave.reason}</StyledTableCell>
                                
                                    {leave.status == "Pandding" && (
                      <>
                        <StyledTableCell align="right">
                          <Button
                            onClick={() => {
                              updateLeave("Accept", leave);
                            }}
                            variant="contained"
                            sx={{ marginRight: "5px" }}
                          >
                            Accept
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Button
                            onClick={() => {
                              updateLeave("Reject", leave);
                            }}
                            variant="contained"
                            color="error"
                            sx={{ marginRight: "5px" }}
                          >
                            Reject
                          </Button>
                        </StyledTableCell>
                      </>
                    )}

                    {leave.status != "Pandding" && (
                      <>
                        <StyledTableCell align="right">
                          {leave.status}
                        </StyledTableCell>
                      </>
                    )}
                                    

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

export default ViewLeave;
