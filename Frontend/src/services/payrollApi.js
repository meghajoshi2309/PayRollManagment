import axios from "axios";

// create payroll
export const CreatePayrollApiCall = async (requestBody) => {
    console.log(requestBody)
    const response = await axios.post('https://localhost:7121/api/PayRolls',requestBody);
    console.log(response)
    return response;
}

// Get All Payroll
export const GetAllPayrollApiCall = async () => {
    const response = await axios.get('https://localhost:7121/api/PayRolls');
    return response.data;
}

//Get One Payroll
export const GetOnePayrollApiCall = async (id) => {
    const response = await axios.get('https://localhost:7121/api/PayRolls/'+id);
    return response.data;
}

//delete payroll
export const DeletePayrollApiCall = async (id) => {
    console.log(id);
    const response = await axios.delete('https://localhost:7121/api/PayRolls/'+id);
    return response;
}

//update payroll
export const UpdatePayrollApiCall = async (id,requestBody) => {
    console.log(id);
    console.log(requestBody);
    const response = await axios.put('https://localhost:7121/api/PayRolls/'+id,requestBody);
    console.log(response.data);
    return response;
}


//get all payroll of one employee
export const GetEmployeePayrollApiCall = async (eId) => {
    const response = await axios.get('https://localhost:7121/api/PayRolls');

    let payRollList = [];

    for(let i=0 ; i<response.data.length ; i++){
        console.log(response.data[i].eId)
        console.log(eId)
        if(response.data[i].eId == eId)
        payRollList.push(response.data[i]);
    }
    console.log(payRollList)
    return payRollList;
}