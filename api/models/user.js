const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModelSchema = new Schema({
    name:String,
    email:String,
    addedDate:{
        day:Number,
        month:Number,
        year:Number,
        hour:Number,
        min:Number,
        iso:Number,
    },
    img:String,
    status:String,

});
module.exports =  mongoose.model('userModel',userModelSchema);

