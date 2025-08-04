const express =require('express')
const rootRouter= require('./routes/index')
const cors= require('cors')
const PORT = process.env.PORT||5000
const app=express()
app.use(cors({
  origin: 'https://quickpay-8.onrender.com',
  credentials: true // optional, if using cookies or auth headers
}));


app.use(express.json())
app.use(cors())
app.use('/api/v1',rootRouter)

app.listen(PORT ,function(req,res){
    console.log("server is running without intruption .. ", PORT)
})