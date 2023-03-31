import React, { useState, useEffect } from 'react';
import { Button, Backdrop, Box, Modal, Fade, Typography, TextField, Card, CardContent, TableContainer, TableBody, TableHead, TableRow, Paper, Table } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate } from "react-router";
import { DeleteUserApiCall , viewEmployeeApiCall} from '../services/usersApi';
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

function ViewEmployee() {

    const user = useSelector(state => state.user);
  console.log(user.eId);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [AllEmpolyee, SetAllEmployee] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [deleteUser, SetDeleteUser] = useState({});
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDisableDeleteBtn, SetisDisableDeleteBtn] = useState(1);

    const handleOpen = () => setOpen(true);

    const handleChange = (event) => {
        if (event.target.value === deleteUser.eId.toString()) {
            SetisDisableDeleteBtn(0);
        } else {
            SetisDisableDeleteBtn(1);
        }
    }

    const DeleteUserIdCall = async (user) => {
        console.log('deleted user');

        try {
            const res = await DeleteUserApiCall(user.eId);
            console.log(res)
            if (res.status === 204) {
                toast.success(res.data);
                console.log(res.data);
                SetDeleteUser({});
                setOpen(false);
                SetisDisableDeleteBtn(1);
                navigate('/auth/viewEmployee');
                window.location.reload();
            }
        } catch (err) {

            console.log(err.res.status);
            toast.error(err.message);
            console.log(err.message);
        }


    }

    useEffect(() => {
        viewEmployeeApiCall().then(async (result) => { await SetAllEmployee(result); }).catch((err) => { console.log(err) });
      },[]);

    

    return (<>
        <Navbar activeLink = {'Manage Employee'}/>
        <br />

        {AllEmpolyee.length === 0 ? <>
            <Box sx={{ display: 'flex', marginLeft: '50%' }}>
                <CircularProgress />
            </Box>
        </> :
            <>
                <TableContainer component={Paper}sx={{ margin: '20px' , width: '97%' }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>UserId</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Email</StyledTableCell>
                                <StyledTableCell align="right">City</StyledTableCell>
                                <StyledTableCell align="right">Department</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {AllEmpolyee.map((user) => (
                                <StyledTableRow key={user.eId}>
                                    <StyledTableCell component="th" scope="row"> {user.eId} </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">{user.name}</StyledTableCell>
                                    <StyledTableCell align="right">{user.email}</StyledTableCell>
                                    <StyledTableCell align="right">{user.city}</StyledTableCell>
                                    <StyledTableCell align="right">{user.department}</StyledTableCell>
                                    <StyledTableCell align="right"> <Button onClick={() => { navigate('/auth/updateEmployee/' + user.eId) }} variant="contained" sx={{ marginRight: '5px' }}>
                                        Edit
                                    </Button></StyledTableCell>
                                    <StyledTableCell> <Button onClick={() => { SetDeleteUser(user); handleOpen(); }} variant="contained" color='error' sx={{ marginRight: '5px' }}>
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
                        Drop Employee
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>

                        To drop the Employee <b>{deleteUser.eId}</b>, type the UserId to confirm.
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

                        <Button onClick={() => { DeleteUserIdCall(deleteUser); }} variant="contained" color='error' disabled={isDisableDeleteBtn} sx={{ marginRight: '5px' }}>
                            Delete
                        </Button>
                        <Button onClick={() => { SetDeleteUser({}); setOpen(false); SetisDisableDeleteBtn(1); }} variant="contained" sx={{ color: '#fafafa' }}>
                            Cancle
                        </Button>

                    </Typography>
                </Box>
            </Fade>
        </Modal>
    </>
    )
}

export default ViewEmployee;
