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
        token:"f0DKkqh3TS6Gih-zQ9xcmO:APA91bGYYbdSku0RsRLziJUtfTMEtp0FbpsNLJQg5Ej4toIkjf2XSu50skWQJSmv4S5K19GR_jTdkLVeEDTZ2aWpKrkaLLuGfKQUmspSFFwjyDzPC40jbGQ-PB6K_uK2Wym-5x7U0AdH"
  
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