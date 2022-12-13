import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  res.send("this is our userRoute");
};

//update a user
export const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    console.log("userId", req.body.userId);
    //user changes to new password...
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      //find the user by params.id and change/set the inputs given by the user
      const userDetailsUpdate = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      return res.status(200).json(userDetailsUpdate);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
};

//delete user
export const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    console.log("userid in bk", req.body.userId);
    try {
      //find the user by params.id and delete the user
      const deleteUser = await User.findByIdAndDelete(req.params.id);
      console.log("delete", deleteUser);
      return res
        .status(200)
        .json({ message: "Account has been deleted", deleteUser });
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
};

//get user
export const getUser = async (req, res) => {
  try {
    //find the user by params.id and get the user
    const getUser = await User.findById(req.params.id);
    //retained the secured info and returning the others in _doc to the frontend
    const { password, updatedAt, ...other } = getUser._doc;
    return res.status(200).json({ message: "Got the user", other });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//follow a user
export const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      /* user himself */
      const user = await User.findById(req.params.id);
      /* user who he wants to follow */
      const toFollowUser = await User.findById(req.body.userId);
      /* checking whether he is follwing this user already ---checking in followers array */
      if (!user.followers.includes(req.body.userId)) {
        //update the current user as a new follower
        await user.updateOne({ $push: { followers: req.body.userId } });
        //update the other user in followings array
        await toFollowUser.updateOne({
          $push: { followings: req.body.userId },
        });
        return res.status(200).json("A new User is followed")
      } else {
        res.send("You are already following this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cannot follow yourself");
  }
};
