const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentModelSchema = new Schema({
    link:String,
    date: {
        day:Number,
        month:Number,
        year:Number,
        hour:Number,
        min:Number,

    }
});


