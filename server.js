const express = require('express')
const cors = require("cors");
const courseRoute = require("./routes/courseRoute")
const StudentRoute = require("./routes/StudentRoute")
const TeacherRoute = require("./routes/teacherRoute")
const app = express();
require("dotenv").config();

const InstituteRoute = require("./routes/instituteRoute");
const mongoose = require("mongoose")
app.use(express.json());


// app.use(express.json());

app.use(cors())
app.use("/api/teacher", TeacherRoute)
app.use("/api/institute", InstituteRoute)
app.use("/api/course", courseRoute)
app.use("/api/student", StudentRoute)
// app.listen(process.env.PORT);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT,() => {
        console.log("Database connected successfully and Server is listening on port 5000")
    })
}).catch((error)=>{
    console.log(error)
})


