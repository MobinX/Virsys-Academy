const userModel = require("../models/user")

exports.getUserList = async (req,res) =>{
  
    try{
        const user = await userModel.find({})
        res.json(user)
    }
    catch(e){
        res.status(500).send(e)
    }
}
exports.getUserById = async (req,res) =>{
  
    try{
        const user = await userModel.findById(req.params.id)
        res.json(user)
    }
    catch(e){
        res.status(500).send(e)
    }
}
exports.addUser = async (req,res) =>{
  
    try{
        const user = new userModel(req.body)
        await user.save()
        res.json(user)
    }
    catch(e){
        res.status(500).send(e)
    }
}
exports.updateUser = async (req,res) =>{
  
    try{
        const user = await userModel.findByIdAndUpdate(req.params.id,req.body,{new: true})
        res.json(user)
    }
    catch(e){
        res.status(500).send(e)
    }
}
exports.deleteUser = async (req,res) =>{
  
    try{
        const user = await userModel.findByIdAndDelete(req.params.id)        
        res.json(user)
    }
    catch(e){
        res.status(500).send(e)
    }
}