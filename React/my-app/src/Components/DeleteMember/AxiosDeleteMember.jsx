
import axios from "axios";

const AxiosDeleteMember = async (memberId, adminId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/Administators/deleteMemberByAdministrator/${adminId}`,
      {
        data: { memberId },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("נמחק בהצלחה", response.data);
    return response.data;
  } catch (error) {
    console.error("שגיאה במחיקה:", error);
    throw error;
  }
};

export default AxiosDeleteMember;
