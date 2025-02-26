const workerResume = require("../models/workerResume");
const workerProfile = require("../models/workerProfile");
const User = require("../models/user");
const path = require('path');
const fs = require('fs');

exports.applyWorkerController = async (req, res) => {
  try {
    const { name, phone, address, description, userId } = req.body;
    const checkuser = await workerResume.findOne({ user: userId });
    let resume = "";
    if (req.file) {
      resume = req.file.filename;
    }
    if (checkuser) {
      checkuser.name = name;
      checkuser.phone = phone;
      checkuser.address = address;
      checkuser.description = description;
      if (req.file) {
        resumepath = path.join(
          path.dirname(__dirname),
          "../backend/public/images/workerresume/"
        );
        if (fs.existsSync(resumepath + checkuser.resume)) {
          fs.unlink(resumepath + checkuser.resume, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("delete successfully");
            }
          });
        }
        checkuser.resume = req.file.filename;
      }
      checkuser.save({ validateBeforeSave: false });
      res.status(200).json({
        flag: true,
        message: "resume update successfully",
      });
    } else {
      const create_resume = await workerResume.create({
        name,
        phone,
        address,
        description,
        user:userId,
        resume,
      });
      if (!create_resume) {
        return res.status(400).json({
          flag: false,
          message: "resume create fails",
        });
      }
      res.status(200).json({
        flag: true,
        message: "resume create successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

async function ResumeFindMethod(resumes){
   const ResumeLists = [];
   for(let value of resumes){
     const find_resume = await workerResume.findOne({user:value.user._id});
     if(find_resume){
        const obj = {
            workerProfile:value,
            workerResume:find_resume
        }
        ResumeLists.push(obj)
     }
   }
   return ResumeLists;
}


exports.getApplyAllResumeController = async (req, res) => {
  try {
    const resumes = await workerProfile.find({ apply: true }).populate('user');;
    const resumesList = await ResumeFindMethod(resumes);
    res.status(200).json({
      flag: true,
      message: "all resume getting successfully",
      resumes:resumesList
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

exports.getApplySingleResumeController = async (req, res) => {
  try {
    const resume = await workerResume
      .findOne({ user: req.params.userid });
    res.status(200).json({
      flag: true,
      message: "single resume getting successfully",
      resume,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

exports.arupWorkerResumeController = async (req, res) => {
  try {
    const userid = req.params.userid;
    const userprofile = await workerProfile.findOneAndUpdate({ user: userid },{apply:false},{new:true});
    if(userprofile){
      res.status(200).json({
        flag: true,
        message: "worker resume arup successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

exports.deleteResumeWorkerController = async (req, res) => {
  try {
    const userid = req.params.userid;
    const userprofile = await workerProfile.findOne({ user: userid });
    const resume = await workerResume.findOne({ user: userid });
    resumepath = path.join(
      path.dirname(__dirname),
      "../backend/public/images/workerresume/"
    );
    if (fs.existsSync(resumepath + resume.resume)) {
      fs.unlink(resumepath + resume.resume, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("delete successfully");
        }
      });
    }
    await workerResume.findByIdAndDelete(resume._id);
    await workerProfile.findByIdAndDelete(userprofile._id);
    await User.findByIdAndDelete(userid);
    res.status(200).json({
      flag: true,
      message: "delete successfully successfully",
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};
