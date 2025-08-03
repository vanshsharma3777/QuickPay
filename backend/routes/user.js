const express= require('express')
const router = express.Router()
const {User , Account} = require('../db')
const zod=require('zod')
const jwt=require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
const {authenticationMiddleware}=require('../authmiddleware')
 const Users=zod.object({
    username:zod.string().email("Invalid email address"),
     lastName:zod.string().min(2, 'Last name is required'),
     firstName:zod.string().min(2,'First name is required'),
     password:zod.string().min('6','Password should atleast be contain 6 characters')
    })
//route to signup

router.post('/signup', async (req,res)=>{
    const userInput=req.body
    const checkUserInput=Users.safeParse(userInput)
    if(!checkUserInput.success){
        return res.status(411).json({
            msg:"Inavlid inputs"
        })
    }
    const isUserExists=await  User.findOne({
        username:req.body.username
    })

    if(isUserExists){
        res.status(411).json({
            msg:"this username already exists please try to signin"
        })
    }

    const newUser= await User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    })

    const userId= newUser._id

    await Account.create({
        userId,
        balance:10000
    })

    const token=jwt.sign({userId :User._id
    }, JWT_SECRET 
)

    res.json({
        msg:'user created succesfully',
        username:req.body.username,
        token:token
    })
})

//route to signin

  const userLogin= zod.object({
         username:zod.string().email(),
       password:zod.string()
 })

router.post('/signin', async(req,res)=>{

   const userInputToSignin=req.body
   const checkUserInput=userLogin.safeParse(userInputToSignin)

    if(!checkUserInput.success){
       return res.status(411).json({
            msg:'invalid username or password'
        })
    }

    const user=await User.findOne({
        username:req.body.username,
    })
     if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

    if (user.password !== req.body.password) {
    return res.status(401).json({ msg: 'Incorrect password' });
  }
   if(user){
    const token =jwt.sign({
        userId:user._id
    },JWT_SECRET)
    
        res.json({
       user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user._id
            },
        token:token

    })
    return;
   }
   res.status(411).json({
    msg:'error while logging in'
   })
})


// route to update the user infromation if wanted 

const updateUser=zod.object({
    username:zod.string().optional(),
    lastName:zod.string().optional(),
    firstName:zod.string().optional(),
    password:zod.string().optional()
})
router.put('/update', authenticationMiddleware ,async(req,res )=>{  
    const userInput =req.body;
    const checkUserInput=updateUser.safeParse(userInput)

    if(!checkUserInput.success){
        res.status(411).json({
            msg:'error while updating the information'
        })
    }

    await User.updateOne({_id:req.userId},req.body);
    res.json({
        msg:"user information updated successfully"
    })
})
module.exports=router