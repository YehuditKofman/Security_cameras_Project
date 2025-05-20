import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { hour: "00:00", people: 2 },
  { hour: "01:00", people: 5 },
  { hour: "02:00", people: 3 },
  { hour: "03:00", people: 8 },
  { hour: "04:00", people: 6 },
  { hour: "05:00", people: 12 },
  { hour: "06:00", people: 7 },
  { hour: "07:00", people: 10 },
  { hour: "08:00", people: 15 },
  { hour: "09:00", people: 9 },
  { hour: "10:00", people: 4 },
  { hour: "11:00", people: 11 },
];

export default function PeopleChart() {
  return (
    <div className="w-full h-96 p-4">
      <h2 className="text-xl font-bold mb-4">כמות אנשים בכל שעה</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="people" fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
