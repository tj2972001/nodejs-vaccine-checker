const axios = require('axios');
require('dotenv').config(); 
const msg = require('./msg');
let dateArr = new Date().toLocaleDateString().split('/');
let date = dateArr[0]+'-'+dateArr[1]+'-'+dateArr[2];  // current date in format dd-mm-yyyy
let messageConfig = {
  
  // GET YOUR OWN NUMBER FROM TWILIO AND ADD IT HERE
  from: '+12104052651',     // get your number from twilio 
  to: '+919503402197'     // messages will sent to this number
}
// const wpConfig = {
//   from: 'whatsapp:+14155238886', 
//   to: 'whatsapp:+917588006297'     
// }


// function for checking vaccine availibility by district
function checkVaccineAvailability() {
  
  // we will get list of available vaccines 7 days from the current date
  console.log(process.argv.slice(2)[1])
  let cowinURL;
  if (process.argv.slice(2)[1] == "district") {
    cowinURL = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${process.argv.slice(2)[0]}&date=${date}`;
  } else if (process.argv.slice(2)[1] == "pin") {
    cowinURL = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${process.argv.slice(2)[0]}&date=${date}`;
  }

  if (cowinURL) {
    axios(cowinURL, {
     headers: { "User-Agent": "cowin - nodejs app" },
  })
    .then(res => {
      let mainMsgContent;
      let cnt=0;
      if (res.data.centers && res.data.centers.length >= 1) {
        for (center of res.data.centers) {
          mainMsgContent = `\nCENTER: ${center.name} \n ADDRESS: ${center.address} \n DISTRICT: ${center.district_name} \n\n\n\n`;
          cnt = 0;
          for (session of center.sessions) {
            if (session.available_capacity >= 1) {
              cnt++;
              mainMsgContent = mainMsgContent + `SR.NO: ${cnt} \n VACCINE: ${session.vaccine} \n MINIMUM AGE: ${session.min_age_limit} \n DATE: ${session.date} \n SLOTS: ${JSON.stringify(session.slots)} \n AVAILABLE: ${session.available_capacity} doses \n\n`;
            }
          }
          if ((mainMsgContent.includes("dose") === true)&&(mainMsgContent.includes("undefined") === false)) {
            messageConfig.body = mainMsgContent;
            msg.sendmsg(messageConfig)
          }
        }
      } else {
        console.log("Unfortunately no vaccines available")
      }
    })
    .catch(e => console.log(e))
  } else {
    console.log("Not valid pin code or district id");
  }
}

const intervalBetweenRequest = 1000 * 60 * 30;

// check vaccine avaibility after every 30 minutes
setInterval(() => {
  checkVaccineAvailability();
}, intervalBetweenRequest)


