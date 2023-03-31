import axios from "axios";


// Get All Leaves
export const GetLeaveApiCall = async () => {
    const response = await axios.get('https://localhost:7121/api/Leaves');
    return response.data;
}

// post leave
export const PostLeaveApiCall = async (requestBody) => {
    console.log(requestBody)
    const response = await axios.post('https://localhost:7121/api/Leaves',requestBody);
    console.log(response)
    return response;
}

//update leave 
export const updateLeaveApiCall = async (leaveId,requestBody) => {
    const response = await axios.put('https://localhost:7121/api/Leaves/'+leaveId,requestBody);
    return response.data;
}

//get all leave of one employee
export const GetEmployeeLeaveApiCall = async (eId) => {
    const response = await axios.get('https://localhost:7121/api/Leaves');

    let leaveList = [];

    for(let i=0 ; i<response.data.length ; i++){
        console.log(response.data[i].eId)
        console.log(eId)
        if(response.data[i].eId == eId)
            leaveList.push(response.data[i]);
    }
    console.log(leaveList)
    return leaveList;
}