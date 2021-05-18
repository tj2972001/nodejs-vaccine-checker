# Welcome to Vaccine Checker written in Javascript

## This script checks vaccine availability repetitively. This is written in Node.js. You can check vaccine availability by either having

**1)** **district code** of the district that you want to check vaccine availability (check **_district.json_** file for district codes) (for e.g: 239)

> To get district id:

> https://cdn-api.co-vin.in/api/v2/admin/location/districts/21 \***_Replace 21 with the state_id_** with the state id of that district\*

>

> **_To get state id's_** : https://cdn-api.co-vin.in/api/v2/admin/location/states

**2) Pin code** of the area that you want to check vaccine availability (for e.g: 414111) [list of all pincodes in india: https://pincode.india-server.com/]

## You will also need Node.js and npm installed on your machine (if you don't have installed then refer : https://nodejs.org/en/download/)

# To setup locally

1. open terminal and `git clone https://github.com/tj2972001/nodejs-vaccine-checker.git`
2. `cd nodejs-vaccine-checker/`
3. `npm install`
4. `npm i nodemon -g`
5. Create account on twilio and get your SID and AUTH ID and Phone number(refer: https://youtu.be/3bQpzN_q2z4 ). Paste this SID, AUTH ID and Phone number in config.js
6. Enter your personal mobile number in `"to"` field in **_config.js_**

## To run locally

**If you have district id, then :**

    nodemon app.js <<district_id_here>> district

for e.g : `nodemon app.js 391 district`

**If you have pincode then:**

    nodemon app.js <<pincode_here>> pin

for e.g: `nodemon app.js 414111 pin`

## To get Vaccination of 18+ age group only

**If you have district id, then :**

    nodemon app.js <<district_id_here>> district 18+

for e.g : `nodemon app.js 391 district 18+`

**If you have pincode then:**

    nodemon app.js <<pincode_here>> pin 18+

for e.g: `nodemon app.js 414111 pin 18+`

## By default script checks vaccine availability after every 30 minutes, you can change it in app.js (line no: 62) by changing `intervalBetweenRequest` value

### Feel free to open issues, if you have any
