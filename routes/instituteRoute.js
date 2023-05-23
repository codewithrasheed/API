const express = require("express");
const { sendResponse } = require("../helper/helper");
const InstituteModel = require("../models/instituteModels");
const route = express.Router();

route.get('/', (req,res) => {
    res.send("Get all institute data");
})

route.get('/:id',async (req,res)=>{
    try {
        const result = await InstituteModel.find();
        if (!result) {
          res.send(sendResponse(false, null, "Data Not Found")).status(404);
        } else {
          res.send(sendResponse(true, result)).status(200);
        }
      } catch (e) {
        res.send(sendResponse(false, null, "Internal Server Error")).status(400);
      }
})

route.post('/', async (req,res) =>{
    const { instituteName, instituteAddress, instituteShortName, institutePhoneNumber } = req.body;
  try {
    if (!instituteName) {
      res.send(sendResponse(false, null, "Institute Name Required"));
    }

    if (!instituteAddress) {
      res.send(sendResponse(false, null, "Institute Address Required"));
    }

    if (!instituteShortName) {
      res.send(sendResponse(false, null, "Institute Short Name Required"));
    } else {
      let Obj = { instituteName, instituteAddress, instituteShortName, institutePhoneNumber};
      let teacher = new InstituteModel(Obj);
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
})

route.put('/:id',(req,res)=>{
    res.send("Edit institute data")
})

route.delete('/:id',(req,res)=>{
    res.send("Delete institute data")
})

module.exports = route