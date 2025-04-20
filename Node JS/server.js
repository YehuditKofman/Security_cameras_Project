require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express(); // אתחול המשתנה app
app.use(express.json()); // חובה כדי לפרסר JSON
app.use(cors());
const { createToken, verifyToken } = require("./Middleware/auth"); 

const DBpass = process.env.MONGO_PASS;
mongoose.connect(DBpass)
    .then(() => console.log("Connected…"))
    .catch(err => console.log(err));

const Administators = require("./Routers/AdministratorsRouter");
const Members = require("./Routers/MembersRouter");
const SecurityCameras = require("./Routers/SecurityCamerasRauter");


app.use("/Administators", Administators);
app.use("/Members", Members);
app.use("/SecurityCameras", SecurityCameras);

app.listen(8080, () => {
    console.log("server is run...");
});