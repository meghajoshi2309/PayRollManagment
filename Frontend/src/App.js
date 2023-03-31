import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/login';
import Register from './auth/register';
import Dashboard from './dashboard';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './ProtectedRoute';
import Profile from './auth/profile';
import Home from './auth/Home';
import ViewEmployee from './auth/viewEmployee';
import UpdateEmployee from './auth/updateEmployee';
import LeaveRequest from './leave/leaveRequest'
import ViewLeave from './leave/viewLeave';
import EmployeeViewLeaveStatus from './leave/employeeViewLeaveStatus';
import CreatePayroll from './payroll/createPayroll';
import ViewAllPayroll from './payroll/viewAllPayroll';
import UpdatePayroll from './payroll/updatePayroll';
import ViewPayroll from './payroll/employeeViewPayroll';

function App() {

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* DashBoard */}
          <Route exact path='/' element={ <RequireAuth>< Home /></RequireAuth>} ></Route>

          {/* Auth Routes */}
          <Route path='/auth'>
            <Route exact path='/auth/login' element={ isLoggedIn ? <Navigate to='/' /> : < Login />}></Route>
            <Route exact path='/auth/home' element={ <Home /> } ></Route>
            <Route exact path='/auth/register' element={< Register />}></Route>
            <Route exact path='/auth/profile' element={<RequireAuth>< Profile  /></RequireAuth>}></Route>
            <Route exact path='/auth/viewEmployee' element={<ViewEmployee />}></Route>
            <Route exact path='/auth/updateEmployee/:eId' element={<UpdateEmployee />}></Route>
          </Route>

          <Route path='/leave'>
            <Route exact path='/leave/createLeave' element={<LeaveRequest/>}></Route>
            <Route exact path='/leave/viewAllLeave' element={<ViewLeave />}></Route>
            <Route exact path='/leave/employeeViewLeaveStatus' element={<EmployeeViewLeaveStatus />}></Route>
          </Route>

          <Route path='/payroll'>
            <Route exact path='/payroll/createPayroll' element={<CreatePayroll />}></Route>
            <Route exact path='/payroll/viewAllPayroll' element={<ViewAllPayroll />}></Route>
            <Route exact path='/payroll/updatePayroll/:PayrollId' element={<UpdatePayroll />}></Route>
            <Route exact path='/payroll/employeeViewPayroll' element={<ViewPayroll />}></Route>
          </Route>

        </Routes>


        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={20000} />
      </div>
    </Router>
  );
}

export default App;
