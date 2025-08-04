const express =require('express')
const rootRouter= require('./routes/index')
const PORT = process.env.PORT || 2000
const cors = require('cors');
const app=express()

app.use(cors({
  origin: "https://quick-pay-smoky.vercel.app", // or "*" to allow all (for dev)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json())
app.use('/api/v1',rootRouter)

app.get('/', function(req,res){
  res.json({
    msg:'working ok'
  })
})

app.listen(PORT ,function(req,res){
    console.log("server is running without intruption .. ", PORT)
})