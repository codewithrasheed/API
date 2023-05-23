const express = require("express");
const CoursesModel = require("../models/courseModels");
const { sendResponse } = require("../helper/helper");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const result = await CoursesModel.find();
    if (!result) {
      res.send(sendResponse(false, null, "Data Not Found")).status(404);
    } else {
      res.send(sendResponse(true, result)).status(200);
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server Error")).status(400);
  }
});

route.get("/:id", (req, res) => {});

route.post("/", async (req, res) => {
  const { courseName, courseDuration, courseFees, courseShortName } = req.body;
  try {
    if (!courseName) {
      res.send(sendResponse(false, null, "Course Name Required"));
    }

    if (!courseDuration) {
      res.send(sendResponse(false, null, "Course Duration Required"));
    }

    if (!courseFees) {
      res.send(sendResponse(false, null, "Course Fees Required"));
    }

    if (!courseShortName) {
      res.send(sendResponse(false, null, "Course Short Name Required"));
    } 
    
    else {
      let Obj = { courseName, courseDuration, courseFees, courseShortName };
      let course = new CoursesModel(Obj);
      await course.save();
      if (!course) {
        res
          .send(sendResponse(false, null, "Internal Server Error"))
          .status(400);
      } else {
        res
          .send(sendResponse(true, course, "Data Saved Successfully"))
          .status(200);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

route.put("/:id", (req, res) => {});
route.delete("/:id", (req, res) => {});


module.exports =  route;