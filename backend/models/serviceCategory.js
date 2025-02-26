const mongoose = require('mongoose');
const serviceCategorySchema = new mongoose.Schema({
    parentId:{
        type:String,
        default:null
    },
    category_name:{
        type:String,
        required:true
    },
    frontImage:{
        type:String,
    },
    backImage:{
        type:String
    },
    description:{
        type:String
    },
    color:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('ServiceCategory',serviceCategorySchema);