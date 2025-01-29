const mongoose = require('mongoose');
const WorkerResumeSchema = new mongoose.Schema({
    user:{
      type:mongoose.Schema.ObjectId,
      ref:'Users'
    },
    name:{
        type:String,
        require:true,
        trim:true
    },
    phone:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    resume:{
        type:String,
        require:true,
    }
},{timestamps:true});

module.exports = mongoose.model('WorkerResume',WorkerResumeSchema);