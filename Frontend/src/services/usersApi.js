import axios from "axios";

// Login api call
export const LoginApiCall = async (requestBody) => {
    // console.log("api call")
    const response = await axios.get('https://localhost:7121/api/Employees');
    let userList = response.data;
    console.log(userList);
    let res
    for(let i=0 ; i<userList.length ; i++){
        console.log(userList[i].email)
        console.log(requestBody.email)
        if(userList[i].email == requestBody.email){
            if(userList[i].password == requestBody.password){
                res = userList[i];
                break;
            }
            else{
                res = -1;
            }
        }
        else{
            res = -2;
        }
        
    }
    console.log(res);
    return  res;
}

// Register Api call
export const RegisterApiCall = async (requestBody) => {
    const response = await axios.post('https://localhost:7121/api/Employees', requestBody);
    return  response ;
}

//Delete Api Call
export const DeleteUserApiCall = async (id) => {
    const response = await axios.delete('https://localhost:7121/api/Employees/'+id);
    return response ;
}

//veiw all employee
export const viewEmployeeApiCall = async () => {
    const response = await axios.get('https://localhost:7121/api/Employees');
    return response.data ;
}

//update employee
export const UpdateUserApiCall = async (id,requestBody) => {
    const response = await axios.put('https://localhost:7121/api/Employees/'+id,requestBody);
    return response;
}

//Get One Employee
export const GetOneUserApiCall = async(id) => {
    const response = await axios.get('https://localhost:7121/api/Employees/'+id);
    return response.data ;
}