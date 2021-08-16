const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contentModel = require("../models/content");
const userModel = require("../models/user");


const courseModelSchema = new Schema({
    name:String,
    price:Number,
    description:String,
    content:[{type:Schema.Types.ObjectId,ref:"contentModel"}],
    enrolledby:[{
        user:{type:Schema.Types.ObjectId,ref:"userModel"},
        date:{
            day:Number,
            month:Number,
            year:Number,
            hour:Number,
            min:Number,
            iso:Number,
        },
        status:String,
    }],
    date:{
        day:Number,
        month:Number,
        year:Number,
        hour:Number,
        min:Number,
        iso:Number,
    },
    publishedby:{type:Schema.Types.ObjectId,ref:"userModel"},
    status:String,
});
    module.exports = mongoose.model('courseModel',courseModelSchema);

