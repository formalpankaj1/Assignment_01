import express from "express";
import User from "../models/userModel.js";
// import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAuth } from "../utils.js";
import bcrypt from "bcrypt";

const userRouter = express.Router();

userRouter.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const signinUser = await User.findOne({ email: email });

    // res.send(signinUser);

    if (!signinUser) {
        res.status(401).send({
            message: 'Invalid Email or Password',
        });
    } else {
        const isMatch = await bcrypt.compare(password, signinUser.password);
        if (isMatch) {
            res.send({
                _id: signinUser._id,
                name: signinUser.name,
                email: signinUser.email,
                token: generateToken(signinUser),
            });
        } else {
            res.status(401).send({
                message: 'Invalid Email or Password',
            });
        }
    }

});

userRouter.post('/register', async (req, res) => {


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    // res.send(signinUser);
    //hashing of passsword:

    const createdUser = await user.save();

    if (!createdUser) {
        res.status(401).send({
            message: 'Invalid user Data',
        });
    } else {
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            token: generateToken(createdUser),
        });
    }
});

userRouter.get('/:username', async (req, res) => {
    const user = await User.find({ name: req.params.username });
    res.send(user);
})

userRouter.get('/:username/followers', async (req, res) => {
    const user = await User.find({ name: req.params.username });
    // console.log(user);
    res.send(user[0].followers);
})

userRouter.get('/:username/following', async (req, res) => {
    const user = await User.find({ name: req.params.username });
    // console.log(user);
    res.send(user[0].following);
})

userRouter.post('/:username/follow', isAuth, async (req, res) => {

    try {
        const usertofollow = req.params.username;
        const userwantstofollow = req.user.name;

        const user = await User.find({ name: userwantstofollow });
        const user2 = await User.find({ name: usertofollow });

        const x = user[0].following.find((x) => x == usertofollow);

        if (!x) {
            //change the followings: 
            user[0].following = [...user[0].following, usertofollow];
            const Updateuser = new User(user[0]);
            const updatedUser = await Updateuser.save();

            //change the followers: 
            user2[0].followers = [...user2[0].followers, userwantstofollow];
            const Updateuser2 = new User(user2[0]);
            const updatedUser2 = await Updateuser2.save();
            res.send('sucessfully followed');
        } else {
            res.send('your are already following this user');
        }
        // res.send(user[0].following);
        // res.send('hi');
    } catch (err) {
        console.log("err : ", err);
        res.send(err);
    }

})
userRouter.delete('/:username/follow', isAuth, async (req, res) => {

    try {
        const usertounfollow = req.params.username;
        const userwantstounfollow = req.user.name;

        const user = await User.find({ name: userwantstounfollow });
        const user2 = await User.find({ name: usertounfollow });

        const x = user[0].following.find((x) => x == usertounfollow);
 
        if (x) {
            //change the followings: 
            user[0].following = user[0].following.filter((x) => x != usertounfollow);
            const Updateuser = new User(user[0]);
            const updatedUser = await Updateuser.save();

            //change the followers: 
            user2[0].followers = user2[0].followers.filter((x) => x != userwantstounfollow);
            const Updateuser2 = new User(user2[0]);
            const updatedUser2 = await Updateuser2.save();
            res.send('sucessfully Unfollowed');
        } else {
            res.send('your are already Unfollowing this user');
        }
        // res.send(user[0].following);
        // res.send('hi');
    } catch (err) {
        console.log("err : ", err);
        res.send(err);
    }

})

export default userRouter;