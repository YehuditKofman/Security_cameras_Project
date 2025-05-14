// AxiosAllMembers.jsx
import axios from "axios";

// קלט מהקומפוננטה - לא משתמשים ב-useSelector כאן
export async function fetchAllMembers(administratorId) {
    const response = await axios.get(
        `http://localhost:8080/Administators/getAllMembersByAdministrator/${administratorId}`
    );
    const members = response.data;
    return members.map((member, index) => ({
        ...member,
        id: member.memberID || index,
    }));
}
