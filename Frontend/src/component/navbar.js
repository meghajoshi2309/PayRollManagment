import React, { useState } from 'react';
import { Box, Toolbar, AppBar, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import '../css/profile-picture.css';
// import ClassIcon from '@mui/icons-material/Class';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import PortraitIcon from '@mui/icons-material/Portrait';
import { RoleName } from '../model/RoleName';
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/slices/userSlice';
import '../css/dashboard.css';

// const pages = [];
const settings = ['Profile', 'Logout'];

function Navbar(props) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [anchorElNav, setAnchorElNav] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [anchorElUser, setAnchorElUser] = useState(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch()

    // Sing Out Function
    const signoutFuncioncall = () => { dispatch(signOut()); }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const user = useSelector(state => state.user);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    let pages = ['Home'];

    if (user.type === RoleName.ADMIN) {
        pages.push("Add Employee");
        pages.push("Manage Employee");
        pages.push("View Leave Requests");
        pages.push("Create Payroll");
        pages.push("Manage Payroll")
    } else if (user.type === RoleName.EMPLOYEE) {
        pages.push("View Payroll");
        pages.push("Generate Leave Report");
        pages.push("View Leave Status")
    } 

    return (
        <AppBar position="static" color="transparent">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ReceiptIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography variant="h6" noWrap component="a" href="/"
                        sx={{
                            mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
                            fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
                        }}> PayRoll
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                            keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                            open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' }, }} >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <ReceiptIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography variant="h5" noWrap component="a" href=""
                        sx={{
                            mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace',
                            fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
                        }}>
                        PayRoll
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <div key={page} >
                                {/* Home */}
                                {page === 'Home' && <Button onClick={() => { navigate('/'); }} className={props.activeLink === 'Home' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>Home</Button>}

                                {/* For Admin */}
                                {page === 'Add Employee' && <Button onClick={() => { navigate('/auth/register'); }} className={props.activeLink === 'Add Employee' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>Add Employee</Button>}
                                {page === 'Manage Employee' && <Button onClick={() => { navigate('/auth/viewEmployee'); }} className={props.activeLink === 'Manage Employee' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>View Employee</Button>}
                                {page === 'View Leave Requests' && <Button onClick={() => { navigate('/leave/viewAllLeave'); }} className={props.activeLink === 'View Leave Requests' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>View Leave Requests</Button>}
                                {page === 'Create Payroll' && <Button onClick={() => { navigate('/payroll/createPayroll'); }} className={props.activeLink === 'Create Payroll' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>Create Payroll</Button>}
                                {page === 'Manage Payroll' && <Button onClick={() => { navigate('/payroll/viewAllPayroll'); }} className={props.activeLink === 'Manage Payroll' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>Manage Payroll</Button>}


                                {/* For Employee */}
                                {page === 'View Payroll' && <Button onClick={() => { navigate('/payroll/employeeViewPayroll'); }} className={props.activeLink === 'View Payroll' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>View Payroll</Button>}
                                {page === 'Generate Leave Report' && <Button onClick={() => { navigate('/leave/createLeave'); }} className={props.activeLink === 'Generate Leave Report' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>Generate Leave Report</Button>}
                                {page === 'View Leave Status' && <Button onClick={() => { navigate('/leave/employeeViewLeaveStatus'); }} className={props.activeLink === 'View Leave Status' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>View Leave Status</Button>}


                            </div>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <div className='profile-picture ' style={{paddingTop: "10px"}}>  {user.name ? user.name[0] : 'C'} </div>
                            </IconButton>
                        </Tooltip>
                        <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                            keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                            open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">
                                        {setting === 'Profile' && <> <Button onClick={() => navigate('/auth/profile') } className="dropdown-item" sx={{ color: 'black'}}><PortraitIcon /> &nbsp; {setting}</Button></>}
                                        {setting === 'Logout' && <> <Button onClick={() => signoutFuncioncall()} className="dropdown-item" sx={{ color: 'black'}}><LogoutIcon /> &nbsp; {setting}</Button>
                                        </>}  </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar;
