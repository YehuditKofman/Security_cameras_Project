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
import html2canvas from "html2canvas";
import SaveAnalysis from "./SaveAnalysis";
import VideoPlayerInAnyleys from "./VideoPlayerInAnyleys";
import PeoplePieChart from "./PeoplePieChart";
import SaveAsImageButton from "./SaveAsImageButton";
import VideoProcessingOverlay from "../Laoding";

export default function PeopleChart() {
  const [Data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isFromMongo, setIsFromMongo] = useState(false);
  const chartRef = useRef(null);
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false); 

  const { showChart, recordingName, ID_video, peopleData } = location.state || {};
  const videoUrl = `http://localhost:8080/videos/${recordingName}`;

  useEffect(() => {
    if (!recordingName) {
      return;
    }

    if (peopleData && peopleData.length > 0) {

      setData(peopleData);
      setIsFromMongo(true);
      return;
    }

    console.log("🚀 שולח בקשה לשרת לניתוח וידאו...");
    setIsProcessing(true); // הפעלת אנימציה

    fetch("http://localhost:5000/people-per-minute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordingName }),
    })
      .then((res) => {
        console.log("📡 תגובת השרת התקבלה, status:", res.status);
        if (!res.ok) throw new Error(`❌ שגיאה מהשרת: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ נתונים התקבלו מהשרת:", data);
        setData(data);
        setIsFromMongo(false);
      })
      .catch((err) => {
        console.error("❌ שגיאה בבקשת fetch:", err.message);
        setError(err.message);
      })
      .finally(() => {
        console.log("🔚 סיום בקשה - מכבה את האנימציה");
        setIsProcessing(false);
      });
  }, [recordingName, peopleData]);




  return (
    <div style={{ padding: "2rem", direction: "rtl" }}>
      <h2 style={{ textAlign: "right", marginBottom: "1rem",color:"white"}}>Visitors throughout the day</h2>

      {error && <p style={{ color: "red" }}>שגיאה: {error}</p>}

      {isProcessing ? (
        <VideoProcessingOverlay />
      ) : Data.length === 0 ? (
        <p>⏳ אין נתונים להצגה</p>
      ) : (
        <>
          {/* גרף עליון */}
          <div
            ref={chartRef}
            style={{
              backgroundColor: "var(--card-bg)",
              borderRadius: "5px",
              padding: "1rem",
              marginBottom: "2rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              width: "100%",
              maxHeight: 400,
            }}
          >
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={Data}>
                <defs>
                  <linearGradient id="colorPeople" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#29cc8b" stopOpacity={0.5} />
                    <stop offset="70%" stopColor="#00d084" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2b2f3f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#444857" />
                <XAxis dataKey="hour" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#383c4d", border: "none", color: "#ffffff" }}
                  labelStyle={{ color: "#ffffff" }}
                  itemStyle={{ color: "#00d084" }}
                />
                <Area
                  type="monotone"
                  dataKey="people"
                  stroke="#00d084"
                  strokeWidth={2}
                  fill="url(#colorPeople)"
                />
              </AreaChart>
            </ResponsiveContainer>


          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
              justifyContent: "center",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* שמאלית: גרף עוגה */}
            <div style={{ flex: "1 1 500px", minWidth: "350px" }}>
              <VideoPlayerInAnyleys videoUrl={videoUrl} />
              <SaveAsImageButton targetRef={chartRef} fileName="graph.png" />


            </div>

            {/* ימנית: נגן ווידאו מוגדל + כפתור */}
            <div
              style={{
                flex: "1 1 500px",
                minWidth: "450px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}

            >
              <div style={{ width: "100%", height: "300px", marginBottom: "1rem" }}>
                <PeoplePieChart data={Data} />

              </div>

            </div>
          </div>


          {/* כפתור שמירה לשרת */}
          {ID_video && !isFromMongo && (
            <div style={{ marginTop: "2rem" }}>
              <SaveAnalysis ID_video={ID_video} data={Data} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

