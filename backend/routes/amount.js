const express= require('express')
const router = express.Router()
const {User, Account } = require('../db')
const {authenticationMiddleware}=require('../authmiddleware')

router.get('/balance', authenticationMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const account = await Account.findOne({ userId: req.userId });
    const allUsers = await User.find({}, 'firstName lastName _id username'); // return only needed fields
    res.json({
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      balance: account?.balance || 0,
      users: allUsers.filter((u) => u._id.toString() !== user._id.toString())
    });
    console.log(user.username)
  } catch (err) {
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});




router.post('/transfer' , authenticationMiddleware , async (req, res)=>{
    const {to , amount}=req.body;
   
    const account = await Account.findOne({userId:req.userId})
    if(account.balance<amount){
         return res.status(403).json({
            msg: "Insufficient balance"
        })
    }
    const toAccount = Account.findOne({userId:to})
    if(!toAccount){
        res.status(411).json({
            msg:"Invalid account"
        })
    }
    await Account.updateOne({
        userId:req.userId
    },{
        $inc:{
            balance:-amount
        }
    })

    await Account.updateOne({
        userId:to
    },{
        $inc:{
            balance:amount
        }
    })

    res.json({
        msg:"transfer succesfull"
    })
})


module.exports=router

