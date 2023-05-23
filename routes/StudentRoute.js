const express = require("express");
const route = express.Router();
// const studentModel = require('.../models/studentModels')
const studentModel = require('../models/StudentModel')
const {sendResponse} = require('../helper/helper')

route.get("/", async (req, res) => {
  try {
    const result = await studentModel.find()
    if(!result){
        res.send(sendResponse(false,  null, "No Data Found")).status(400)
    } else{
        res.send(sendResponse(true, result)).status(200)
    }
  } catch (e) {
    console.log(e)
    res.send(sendResponse(false, null, "Internal Server Error")).status(400)
  }
});

route.get("/:id", async (req, res) => {
    let id = req.params.id;
    let result = await studentModel.findById(id)
    if(result){
        res.send(sendResponse(true, result)).status(200);
    }
    else{
        res.send("Data Not Found!").status(404);
    }});

route.post("/", async (req, res) => {
  let {firstName, lastName, contact, course} = req.body;
  try{
//   let errArr = [];
  if(!firstName){
    res.send(sendResponse(false,  null, "First Name Required")).status(400)
  }
  if(!contact){
    res.send(sendResponse(false,  null, "Contact Required")).status(400)
  }
  if(!course){
    res.send(sendResponse(false,  null, "Course Required")).status(400)
  }
  else{
    let obj = {firstName, lastName, contact, course};
    let student = new  studentModel(obj);
    await student.save();
    if(!student){
        res.send(sendResponse(false, null, "Internal Server Error")).status(400)
    }else{
        res.send(sendResponse(true, student, "Saved Successfuly")).status(200)
    }
  }
}
catch(err){
    if(err.length > 0){
        res.send(sendResponse(false, student, null, "Required All Fields")).status(400)
    return;
  }
}
});

route.put("/:id", (req, res) => {
  res.send("Edit student data");
});

route.delete("/:id", (req, res) => {
  res.send("Delete student data");
});

module.exports = route;