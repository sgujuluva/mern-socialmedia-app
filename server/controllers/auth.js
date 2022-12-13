import User from "../models/User.js"
import bcrypt from "bcrypt"
//register user
export const registerUser = async (req,res) => {
    const {username,email,password}=req.body
    console.log(req.body.username)
      try {
         const checkUserNameExist = await User.findOne({email:req.body.email})

        if(checkUserNameExist){
           return res.send("The user already registered")
        }else{  
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password,salt)
            
            const createUser = await User.create({
                username:username,
                email:email,
                password:hashedPassword
            })
              return res.status(200).json(createUser)
                  }
    } catch (error) {
        return res.send(error)
    }  

}
