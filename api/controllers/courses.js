const courseModel = require("../models/course");
const contentModel = require("../models/content");
const userModel = require("../models/user");
const {ObjectId} = require("mongodb")

exports.getCourseList = async (req,res) => {

    try{
        const courses = await courseModel.find({})
            res.send(JSON.stringify(courses))
        
        
    }                
    catch(e){
        res.status(500).send(e);
    }
}

exports.getCourseById = async (req,res) =>{
    try{
        const courses = await courseModel.findById(req.params.id)
        res.send(JSON.stringify(courses))
    }
    catch(e){
        res.status(500).send(e);
    }
}


exports.addCourse = async (req,res) => {
    
   
    const course = new courseModel(req.body);

    
    try{
        await course.save();
        res.send(JSON.stringify(course))
    }
    catch(e){
        res.status(500).send(e);
    }

}

exports.updateCourse = async (req,res) => { 
    try{
        await courseModel.findByIdAndUpdate(req.params.id,req.body)
        await courseModel.save()     
    }
    catch(e){
        res.status(500).send(e);
    }

}

exports.deleteCourse = async (req,res) => {
    try{
        const course = courseModel.findByIdAndDelete(req.params.id)
        if(!course) res.status(404).send("Not Found")
    }
    catch(e){
        res.status(500).send(e);
    }

}

exports.DeleteManyCourses = async (req,res) => {

}

exports.updateManyCourses = async (req,res) => {

}

exports.addContent = async (req,res) => {

    const content = new contentModel(req.body);
    try{
        await content.save();
        res.send(JSON.stringify(content))
    }
    catch(e){
        res.status(500).send(e);
    }

}

exports.getContents = async (req,res) => {
    try{
        const contents = await contentModel.find({})
        res.send(JSON.stringify(contents));
    }
    catch(e){
        res.status(500).send(e)
    }
}

exports.updateContent = async (req,res) => {

    try{
        await contentModel.findByIdAndUpdate(req.params.id,req.body)
        await contentModel.save()     
    }
    catch(e){
        res.status(500).send(e);
    }

}

exports.deleteContent = async (req,res) => {

    try{
        const course = contentModel.findByIdAndDelete(req.params.id)
        if(!course) res.status(404).send("Not Found")
    }
    catch(e){
        res.status(500).send(e);
    }
}

