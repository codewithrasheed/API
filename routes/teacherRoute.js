const express = require("express");
const TeacherModel = require("../models/teacherModels");
const { sendResponse } = require("../helper/helper");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const result = await TeacherModel.find();
    if (!result) {
      res.send(sendResponse(fasle, null, "Data Not Found!")).status(404);
    } else {
      res.send(sendResponse(true, result)).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(400);
  }
});

route.get("/:id", (req, res) => {
  res.send("Get single teachers data");
});

route.post("/", async (req, res) => {
  const { teacherName, course, contact } = req.body;
  try {
    if (!teacherName) {
      res.send(sendResponse(false, null, "Teacher Name Required"));
    }

    if (!course) {
      res.send(sendResponse(false, null, "Course Name Required"));
    }

    if (!contact) {
      res.send(sendResponse(false, null, "Contact Number Required"));
    } else {
      let Obj = { teacherName, course, contact };
      let teacher = new TeacherModel(Obj);
      await teacher.save();
      if (!teacher) {
        res
          .send(sendResponse(false, null, "Internal Server Error"))
          .status(400);
      } else {
        res
          .send(sendResponse(true, teacher, "Data Saved Successfully"))
          .status(200);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

route.put("/:id", (req, res) => {
  res.send("Edit teachers data");
});

route.delete("/:id", (req, res) => {
  res.send("Delete teachers data");
});

module.exports = route;