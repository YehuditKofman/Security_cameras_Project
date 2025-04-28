import axios from "axios";

export async function fetchAllMembers() {
    const administratorId = "68043ccf8b5cb28fe901eb41";
    const response = await axios.get(`http://localhost:8080/Administators/getAllMembersByAdministrator/${administratorId}`);
    return response.data;
}
