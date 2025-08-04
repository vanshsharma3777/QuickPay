const express = require('express')
const router = express.Router()
const { User, Account } = require('../db')
const { authenticationMiddleware } = require('../authmiddleware')

router.get('/balance', authenticationMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const account = await Account.findOne({ userId: req.userId });
    const allUsers = await User.find({}, 'firstName lastName _id username');
    res.json({
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      },
      balance: account?.balance || 0,
      users: allUsers.filter((u) => u._id.toString() !== user._id.toString())
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});




router.post('/transfer', authenticationMiddleware, async (req, res) => {
  const { to, amount } = req.body;
    const parsedAmount = Number(amount);

if (isNaN(parsedAmount) || parsedAmount <= 0) {
  return res.status(400).json({ msg: "Invalid transfer amount" });
}

const account = await Account.findOne({ userId: req.userId });

if (account.balance < parsedAmount) {
  return res.status(403).json({ msg: "Insufficient balance" });
}

  await Account.updateOne({
    userId: req.userId
  }, {
    $inc: {
      balance: -parsedAmount
    }
  })

  await Account.updateOne({
    userId: to
  }, {
    $inc: {
      balance: parsedAmount
    }
  })

  res.json({
    msg: "transfer succesfull"
  })
})


module.exports = router

