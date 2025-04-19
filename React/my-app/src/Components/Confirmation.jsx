// import React from 'react';

// const Confirmation = ({ formData, handleChange, dispatch }) => (
//     <div>
//         <h2></h2>
//         <div>
//             <label>
//                 <input
//                     type="checkbox"
//                     name="termsAccepted"
//                     checked={formData.termsAccepted}
//                     onChange={handleChange}
//                 />
//                 אני מאשרת את תנאי השימוש
//             </label>
//         </div>
//         <button
//             type="button"
//             onClick={() => {
//                 console.log("formData", formData);
//                 dispatch(Create_Administrator({
//                     name: formData.name,
//                     email: formData.email,
//                     phone: formData.phone,
//                     password: formData.password,
//                     role: formData.role,
//                     arrMembers: [],
//                     arrSecurityCameras: [],
//                     arrAnalysisSchema: []
//                 }));
//             }}
//         >
//             Create Administrator
//         </button>
//     </div>
// );

// export default Confirmation;
