import User from "../models/User.js"
//register user
export const registerUser = async (req,res) => {
    const {username,email,password}=req.body
    console.log(req.body.username)
     try {
         const checkUserNameExist = await User.findOne({email:req.body.email})

        if(checkUserNameExist){
           return res.send("The user already registered")
        }else{ 
            const createUser = await new User.create({
                username:username,
                email:email,
                password:password
            })
             // return res.status(200).json(createUser)
            return res.send(createUser)
       }
    } catch (error) {
        return res.send(error)
    } 

}
/*  const createUser = await new User({
             username:req.body.username,
             email:req.body.email,
             password:req.body.password
         })
         try{
             const user = await newUser.save()
             res.status(200).json(user)
         }catch(error){
             console.log(error)
         } */