const express = require('express')
const webPush = require('web-push')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {StatusCodes} = require('http-status-codes')
const PORT = process.env.PORT
const connectDb = require('./db/connect')
const path= require('path')

// instance
const app = express()

//set static path 
app.use(express.static(path.join(__dirname,"client")))

//body parser
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))// query format of data
app.use(express.json())// json format of data


// middleware
app.use(cors())// cross origin resource sharing
app.use(cookieParser(process.env.ACCESS_SECRET))

const publicVapidKey = 'BCbsyUcnfCel5E3m4UEW7-GOIZZsUdVLJPvQg1OvmCADpPFMROU4h25Uu-nVnL_bJwaJPPNFBEG_bu-97C8qUjs';
const privateVapidKey = 'ZLnDmlocRcY0VaX81PFuv4fktV2FZ0XQyrRseKVZ-XY';

webPush.setVapidDetails(
    'mailto:sanjanaraj1672@example.com',
    publicVapidKey, privateVapidKey );
 
   //Subscribe Route
app.post('/subscribe',(req,res) =>{
    //Get pushSubscription Object
  const subscription = req.body;

  //Send 201 - resource created
   res.status(StatusCodes.OK).json({})

   //Create payload
   const notificationPayload = {
    notification: {
      title: 'Appointment Reminder',
      body: 'Your appointment is coming up soon!',
      icon: 'https://example.com/icon.png'
    }
  };

   //Pass object into sendNotifications
    webPush.sendNotification(subscription, JSON.stringify(notificationPayload)).catch(err => console.error(err));
})

 
// api route
app.use(`/api/auth`, require('./route/authRoute'))

// default route
app.use(`**`, (req, res) => {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ msg : `Requsted service path is not available`})
})

// server
app.listen(PORT,() => {
    connectDb()
    console.log(`server is started and running @ http://localhost:${PORT}`)
})