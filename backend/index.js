const express =require('express')
const rootRouter= require('./routes/index')
const PORT = process.env.PORT || 2000
const cors = require('cors');
const app=express()
const allowedOrigins = [
  'http://localhost:5173',
  "https://quick-pay-m4vt.vercel.app",
  'https://quickpay-2backe.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json())
app.use(cors())
app.use('/api/v1',rootRouter)

app.get('/', function(req,res){
  res.json({
    msg:'working ok'
  })
})

app.listen(PORT ,function(req,res){
    console.log("server is running without intruption .. ", PORT)
})