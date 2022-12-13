import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getAllUsers = async(req,res) => {
    res.send("this is our userRoute")
}

//update a user
export const updateUser=async(req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        console.log("userId",req.body.userId)
        //user changes to new password... 
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10); 
                req.body.password = await bcrypt.hash(req.body.password,salt) 
            }catch(error){
               return res.status(500).json(error) 
            }
        }
        try {
            //find the user by params.id and change/set the inputs given by the user
            const userDetailsUpdate = await User.findByIdAndUpdate(req.params.id, {
                $set : req.body
            })
     
            return res.status(200).json(userDetailsUpdate)
        } catch (error) {
           return res.status(500).json(error)
        }
    }else{
        return res.status(403).json("You can update only your account")
    }
}

//delete user
export const deleteUser=async(req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){      
        console.log("userid in bk",req.body.userId)
        try {
            //find the user by params.id and delete the user
            const deleteUser = await User.findByIdAndDelete(req.params.id)
     console.log("delete",deleteUser)
            return res.status(200).json({message:"Account has been deleted",deleteUser})
        } catch (error) {
           return res.status(500).json(error)
        }
    }else{
        return res.status(403).json("You can delete only your account")
    }
}