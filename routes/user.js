const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//getting all data
router.get('/alldata', async(req, res)=>{
    try{
        const allUsers = await User.find();
        if(! allUsers){
            res.status(500).json("Database is empty.");
        }
        else{
            res.status(200).json(allUsers);
        }
    }catch(err){
        res.status(500).json(err);
    }
})


//REGISTER
router.post('/register', async (req, res)=>{
    
    if(req.body.password1 != req.body.password2){
        res.status(500).json("Passwords are not similar!!!");
    }
    else if(req.body.password1.length < 8){
        res.status(500).json("Passwords should be of atleast 8 characters.")
    }
    else{
        const newUser = new User({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            username : req.body.username,
            email : req.body.email,
            password : CryptoJS.AES.encrypt(req.body.password1, process.env.SECRET_KEY).toString(),
        })
        
        try{
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        }catch(err){
            res.status(500).json(err);
        }
    }
    
})

//Login

router.post("/login", async(req, res)=>{
   try{ const user = await User.findOne({username: req.body.username})
    if(!user){
        res.status(500).json("Wrong credentials!!");
    }
    else{
        const originalPassword = CryptoJS.AES.decrypt(
            user.password, process.env.SECRET_KEY)
            .toString(CryptoJS.enc.Utf8);
        if(originalPassword != req.body.password){
            res.status(500).json("Please check your Password!!!");
        }
        else{
            const accessToken = jwt.sign({
                id:user._id
            },process.env.SECRET_KEY, {expiresIn:"3d"})
            const {password, ...others} = user._doc;
            res.status(200).json({others, accessToken});
        }
        
        }
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;