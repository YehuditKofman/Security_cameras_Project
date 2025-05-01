// // import React from 'react';

// // const Confirmation = ({ formData, handleChange, dispatch }) => (
// //     <div>
// //         <h2></h2>
// //         <div>
// //             <label>
// //                 <input
// //                     type="checkbox"
// //                     name="termsAccepted"
// //                     checked={formData.termsAccepted}
// //                     onChange={handleChange}
// //                 />
// //                 אני מאשרת את תנאי השימוש
// //             </label>
// //         </div>
// //         <button
// //             type="button"
// //             onClick={() => {
// //                 console.log("formData", formData);
// //                 dispatch(Create_Administrator({
// //                     name: formData.name,
// //                     email: formData.email,
// //                     phone: formData.phone,
// //                     password: formData.password,
// //                     role: formData.role,
// //                     arrMembers: [],
// //                     arrSecurityCameras: [],
// //                     arrAnalysisSchema: []
// //                 }));
// //             }}
// //         >
// //             Create Administrator
// //         </button>
// //     </div>
// // );

// // export default Confirmation;
// import { useState } from 'react';
// import {
//   Container, Title, Grid, Card, Video, Text, Flex,
//   Tabs, Switch, Box, Chart, useTheme
// } from 'pream/react';

// export default function SurveillanceDashboard() {
//   const [darkMode, setDarkMode] = useState(false);
//   const theme = useTheme();

//   const videoUrls = [
//     '/videos/cam1.mp4',
//     '/videos/cam2.mp4',
//     '/videos/cam3.mp4',
//     '/videos/cam4.mp4',
//     '/videos/cam5.mp4',
//     '/videos/cam6.mp4',
//   ];

//   const chartData = [
//     { time: '08:00', people: 2 },
//     { time: '09:00', people: 5 },
//     { time: '10:00', people: 8 },
//     { time: '11:00', people: 3 },
//   ];

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//     theme.set(darkMode ? 'light' : 'dark');
//   };

//   return (
//     <Box dir="rtl" style={{ minHeight: '100vh', background: darkMode ? '#1e1e1e' : '#f9f9f9' }}>
//       <Container padding="lg">
//         <Flex justify="space-between" align="center" mb="lg">
//           <Title size="2xl" weight="bold" color={darkMode ? 'white' : 'black'}>
//             לוח בקרה - מצלמות אבטחה
//           </Title>
//           <Flex align="center" gap="sm">
//             <Text color={darkMode ? 'gray.300' : 'gray.700'}>מצב כהה</Text>
//             <Switch checked={darkMode} onChange={toggleTheme} />
//           </Flex>
//         </Flex>

//         <Tabs defaultValue="videos">
//           <Tabs.List>
//             <Tabs.Tab value="videos">📷 מצלמות</Tabs.Tab>
//             <Tabs.Tab value="info">🧾 מידע</Tabs.Tab>
//             <Tabs.Tab value="charts">📈 גרפים</Tabs.Tab>
//           </Tabs.List>

//           <Tabs.Panel value="videos" pt="md">
//             <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">
//               {videoUrls.map((url, i) => (
//                 <Card key={i} shadow="md" radius="lg">
//                   <Video src={url} controls autoPlay muted loop style={{ borderRadius: '12px' }} />
//                   <Text mt="sm" weight="bold">מצלמה {i + 1}</Text>
//                 </Card>
//               ))}
//             </Grid>
//           </Tabs.Panel>

//           <Tabs.Panel value="info" pt="md">
//             <Card shadow="sm" padding="md">
//               <Text>📅 תאריך היום: 30/04/2025</Text>
//               <Text>🟢 מצלמות פעילות: 6</Text>
//               <Text>🚨 אירועים חריגים: 2</Text>
//               <Text>🧠 ניתוח חכם: זיהוי אדם באזור חסום</Text>
//             </Card>
//           </Tabs.Panel>

//           <Tabs.Panel value="charts" pt="md">
//             <Card padding="lg" shadow="sm">
//               <Chart
//                 type="line"
//                 data={chartData}
//                 dataKey="time"
//                 lineKey="people"
//                 xLabel="שעה"
//                 yLabel="כמות אנשים"
//                 color="teal"
//               />
//             </Card>
//           </Tabs.Panel>
//         </Tabs>
//       </Container>
//     </Box>
//   );
// }
