# import cv2
# import time
# from tqdm import tqdm
# from collections import defaultdict
# from datetime import timedelta
# from flask import Flask, jsonify
# from flask_cors import CORS
# from ultralytics import YOLO
#
# app = Flask(__name__)
# CORS(app)
#
# model = YOLO("yolov8n.pt")
#
# def analyze_video(video_path):
#     start_time = time.time()
#
#     cap = cv2.VideoCapture(video_path)
#     if not cap.isOpened():
#         print("❌ Error: Couldn't open video file.")
#         return []
#
#     fps = cap.get(cv2.CAP_PROP_FPS)
#     total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
#     frame_count = 0
#     results_by_minute = defaultdict(list)
#
#     progress = tqdm(total=total_frames, desc="🔍 Analyzing video", unit="frame")
#
#     while True:
#         success, frame = cap.read()
#         if not success:
#             break
#
#         frame_count += 1
#         interval = 5  # זמן חלוקה ב-5 שניות
#         segment = int(frame_count / (fps * interval))
#
#         results = model.predict(frame, verbose=False)[0]
#         people_count = sum(1 for c in results.boxes.cls if int(c) == 0)
#         results_by_minute[segment].append(people_count)
#
#         progress.update(1)
#
#         if frame_count % 100 == 0:
#             print(f"✅ Processed {frame_count} frames...")
#
#     cap.release()
#     progress.close()
#
#     end_time = time.time()
#     print(f"✅ Analysis completed in {end_time - start_time:.2f} seconds")
#
#     final_data = []
#     for minute, people_list in sorted(results_by_minute.items()):
#         avg_people = int(sum(people_list) / len(people_list))
#         time_str = str(timedelta(minutes=minute))[:5]
#         final_data.append({
#             "hour": time_str,
#             "people": avg_people
#         })
#
#     return final_data
#
# video_data = []
#
# @app.route("/")
# def home():
#     return "Server is running. Use /people-per-minute to get data."
#
# @app.route("/people-per-minute")
# def get_people_data():
#     return jsonify(video_data)
#
# if __name__ == "__main__":
#     video_path = "vidio.mp4"  # ודא שהקובץ נמצא באותה תיקייה
#     print("⏳ Starting video analysis...")
#     video_data = analyze_video(video_path)
#     print("🚀 Starting Flask server...")
#     app.run(debug=False)
import cv2
import time
from tqdm import tqdm
from collections import defaultdict
from datetime import timedelta
from flask import Flask, jsonify, request
from flask_cors import CORS
from ultralytics import YOLO
import os

app = Flask(__name__)
CORS(app)

model = YOLO("yolov8n.pt")

def analyze_video(video_path):
    start_time = time.time()

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print("❌ Error: Couldn't open video file.")
        return []

    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_count = 0
    results_by_minute = defaultdict(list)

    progress = tqdm(total=total_frames, desc="🔍 Analyzing video", unit="frame")

    while True:
        success, frame = cap.read()
        if not success:
            break

        frame_count += 1
        interval = 5  # חלוקה כל 5 שניות
        segment = int(frame_count / (fps * interval))

        results = model.predict(frame, verbose=False)[0]
        people_count = sum(1 for c in results.boxes.cls if int(c) == 0)
        results_by_minute[segment].append(people_count)

        progress.update(1)

        if frame_count % 100 == 0:
            print(f"✅ Processed {frame_count} frames...")

    cap.release()
    progress.close()

    end_time = time.time()
    print(f"✅ Analysis completed in {end_time - start_time:.2f} seconds")

    final_data = []
    for minute, people_list in sorted(results_by_minute.items()):
        avg_people = int(sum(people_list) / len(people_list))
        time_str = str(timedelta(minutes=minute))[:5]
        final_data.append({
            "hour": time_str,
            "people": avg_people
        })

    return final_data

@app.route("/")
def home():
    return "Server is running. Use /people-per-minute to post video name."

@app.route("/people-per-minute", methods=["POST"])
def get_people_data():
    data = request.get_json()
    if not data or "recordingName" not in data:
        return "Missing recordingName", 400

    recording_name = data["recordingName"]
    video_path = os.path.join("videos", recording_name)

    if not os.path.exists(video_path):
        return f"Video file {recording_name} not found", 404

    result = analyze_video(video_path)
    return jsonify(result)

if __name__ == "__main__":
    print("🚀 Starting Flask server...")
    app.run(debug=False)
