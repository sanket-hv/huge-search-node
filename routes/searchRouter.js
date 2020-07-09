const express= require('express');
const router = express.Router();
const cities = require('cities-list');
const redis = require('redis');
const redisclient = redis.createClient();

var temp = []

redisclient.on("error", function (error) {
    console.error(error);
})

for (const [key, value] of Object.entries(cities)) {
    // console.log(`${key}`)
    redisclient.set(`${key}`, `${key}`);
}
for (const [key, value] of Object.entries(cities)) {
    redisclient.get(`${key}`, (error, result) => {
        // console.log("ooooo")
        temp.push({
            "cityname": result
        })
    })
}

// console.log(cities)

router.get('/page',(req,res)=>{
    res.render('search', { results: temp, layout: false });
})

router.post('/findcity',(req,res)=>{
    console.log("fired");
    const ui = req.body.fc;

    var output = temp.filter(({ cityname }) => {
        return cityname.includes(ui);
    })

    res.send(output);
})

module.exports = router;
