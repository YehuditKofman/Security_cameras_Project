import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import html2canvas from "html2canvas"; // ← ייבוא הספרייה
import SaveAnalysis from "./SaveAnalysis";

export default function PeopleChart() {
  const [Data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isFromMongo, setIsFromMongo] = useState(false);
  const chartRef = useRef(null); // ← רפרנס לגרף
  const location = useLocation();
  const { showChart, recordingName, ID_video, peopleData } = location.state || {};
  const videoUrl = `http://localhost:8080/videos/${recordingName}`;

  useEffect(() => {
    if (!recordingName) return;

    if (peopleData && peopleData.length > 0) {
      setData(peopleData);
      setIsFromMongo(true);
      return;
    }

    fetch("http://localhost:5000/people-per-minute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordingName })
    })
      .then((res) => {
        if (!res.ok) throw new Error(`שגיאה מהשרת: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsFromMongo(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [recordingName, peopleData]);

  // פונקציה לשמירת הגרף
  const handleDownload = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current);
    const link = document.createElement("a");
    link.download = "graph.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={{ width: "100%", height: 450, padding: "1rem", direction: "rtl" }}>
      <h2 style={{ textAlign: "right", marginBottom: "1rem" }}>מבקרים לאורך היום</h2>

      {error && <p style={{ color: "red" }}>שגיאה: {error}</p>}

      {Data.length === 0 ? (
        <p>⏳ טוען נתונים...</p>
      ) : (
        <div ref={chartRef} style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={Data}>
              <defs>
                <linearGradient id="colorPeople" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3f80ff" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3f80ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="people"
                stroke="#3f80ff"
                fillOpacity={1}
                fill="url(#colorPeople)"
              />
            </AreaChart>
          </ResponsiveContainer>

        </div>

      )}

      {Data.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button onClick={handleDownload} style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3f80ff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            שמור גרף כתמונה
          </button>
          <video width="100%" height="300" controls style={{ marginTop: "1rem", borderRadius: "8px" }}>
            <source src={videoUrl} type="video/mp4" />
            הדפדפן שלך לא תומך בהצגת וידאו.
          </video>

        </div>
      )}



      {Data.length > 0 && ID_video && !isFromMongo && (
        <SaveAnalysis ID_video={ID_video} data={Data} />
      )}
    </div>
  );
}
