const courseModel = require("../models/course");
const contentModel = require("../models/content");
const userModel = require("../models/user");
const {ObjectId} = require("mongodb")

exports.getCourseList = async (req,res) => {

    try{
        const courses = await courseModel.find({})
            res.json(courses)
        
        
    }                
    catch(e){
        res.status(500).send(e);
    }
}

exports.getCourseById = async (req,res) =>{
    try{
        const courses = await courseModel.findById(req.params.id)
        res.json(courses)
    }
    catch(e){
        res.status(500).send(e);
    }
}


exports.addCourse = async (req,res) => {
    
   
    const course = new courseModel(req.body);

    
    try{
        await course.save();
        res.json(course)
    }
    catch(e){
        res.status(500).send(e);
    }

}

exports.updateCourse = async (req,res) => { 
    try{
        const courses = await courseModel.findByIdAndUpdate(req.params.id,req.body,{new: true})
        
        res.status(200).json(courses);     
    }
    catch(e){
        console.log(e)
        res.status(500).send(e);
    }

}

exports.deleteCourse = async (req,res) => {
    try{
        const course = await courseModel.findByIdAndRemove(req.params.id)

        console.log(course)
        if(!course) res.status(404).send("Not Found")
        res.status(200).json(course);


        
    }
    catch(e){
        console.log(e)
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
        res.json(content)
    }
    catch(e){
        res.status(500).send(e);
    }

}

exports.getContents = async (req,res) => {
    try{
        const contents = await contentModel.find({})
        res.json(contents)
    }
    catch(e){
        res.status(500).send(e)
    }
}

exports.updateContent = async (req,res) => {

    try{
        const contents = await contentModel.findByIdAndUpdate(req.params.id,req.body,{new: true})
        
        res.status(200).json(contents);       
    }
    catch(e){
        res.status(500).send(e);
    }

}

exports.deleteContent = async (req,res) => {

    try{
        const content = await contentModel.findByIdAndRemove(req.params.id)

        console.log(content)
        if(!content) res.status(404).send("Not Found")
        res.status(200).json(content);
    }
    catch(e){
        res.status(500).send(e);
    }
}

