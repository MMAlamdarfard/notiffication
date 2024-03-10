var admin = require("firebase-admin");
var fcm = require("@diavrank/fcm-notification");

var serviceAccount = require("../config/push-notification-key.json");
const certPath =admin.credential.cert(serviceAccount)

admin.initializeApp({
  credential:certPath
});

var FCM = new fcm(certPath);

exports.sendPushNotification = (req,res,next)=>{
   try {
      
    let message = {
        notification:{
          title:"Test Notification",
          body:"Notification Message",    
        },
        data:{
           orderId:"123456",
           orderDate:"202020202002"
        },
        token:"eFMwzXb8RC2b5KA_rH9VlN:APA91bHWu7YEjo9rmVmeaWvLDZpRaPKlWs6Sbi8vGJQC8FD0hs7tNpLfE-VAqtLiYEhH8garxDEEAhwdtvfXF3mu6vysy5XrwHNbebiTj3yMuSMi-oWOK_ge_gPFLfCq3EQa-8Xqt_Z4"
  
    }
    FCM.send(message,function(err){
       if(err){
        console.log(err)
         
         res.status(500).send({
            message:err
        })
       }
       else{
         res.status(200).send({
            message:"Notification sent successfully"
        })
       }
    })




   } catch (error) {
     throw error
   }
 

}