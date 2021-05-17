const accountSid = process.env.TWILIO_ACCOUNT_SID || "<YOUR ACCOUNTSID FROM TWILIO>"; 
const authToken = process.env.TWILIO_AUTH_TOKEN || "<YOUR AUTH TOKEN FROM TWILIO>";


const client = require('twilio')(accountSid, authToken);

module.exports.sendmsg = function (messageConfig) {
  client.messages 
      .create(messageConfig)
      .then(message => console.log(message.sid)) 
      .catch(e=>console.log(e))  
}
