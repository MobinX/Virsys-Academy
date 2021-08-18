const userModel = require("../models/user")

exports.getUserList = async (req,res) =>{
  
    try{
        const user = await userModel.find({})
        res.send(JSON.stringify(user))
    }
    catch(e){
        res.status(500).send(e)
    }
}
exports.getUserById = async (req,res) =>{
  
    try{
        const user = await userModel.findById(req.params.id)
        res.send(JSON.stringify(user))
    }
    catch(e){
        res.status(500).send(e)
    }
}
exports.addUser = async (req,res) =>{
  
    try{
        const user = new userModel(req.body)
        await user.save()
        res.send(JSON.stringify(user))
    }
    catch(e){
        res.status(500).send(e)
    }
}
exports.updateUser = async (req,res) =>{
  
    try{
        await userModel.findByIdAndUpdate(req.params.id,req.body)
        await userModel.save()
        res.send("")
    }
    catch(e){
        res.status(500).send(e)
    }
}
exports.deleteUser = async (req,res) =>{
  
    try{
        await userModel.findByIdAndDelete(req.params.id,req.body)
        await userModel.save()
        res.send(JSON.stringify("user"))
    }
    catch(e){
        res.status(500).send(e)
    }
}