const configObj = require("./config").appConfig;
const accountSid = process.env.TWILIO_ACCOUNT_SID || configObj.accountSid;
const authToken = process.env.TWILLIO_AUTH_TOKEN || configObj.authToken;
const client = require("twilio")(accountSid, authToken);

module.exports.sendmsg = function (messageConfig) {
  console.log(accountSid, authToken);
  client.messages
    .create(messageConfig)
    .then((message) => console.log(message.sid))
    .catch((e) => console.log(e));
};
