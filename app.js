require('dotenv').config();

const express = require('express');

const axios = require('axios');

let PORT = 3000

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
    res.send("everything is okeydokey")
})

app.get('/:device', function(req, res) {
        let device = req.params.device
        console.log(req.query.ns)
        
        let nsname = req.query.ns
        let nsadress = "https://"+nsname+".herokuapp.com/api/v1/entries.json?count=243"
        let treatAddr = "https://"+nsname+".herokuapp.com/api/v1/treatments.json?count=243"
        //console.log(nsadress)
        let health = "";
        let url = 'http://192.168.1.26:3333/getrecords/'+device;
        //let url = 'http://healthnode-api-service:3333/getrecords/'+device;
        //console.log(url);
        axios.get(url) 
        .then(response => {
            health = JSON.stringify(response.data);
            let nightscout = "";
            axios.get(nsadress)
            .then(response => {
                nightscout = JSON.stringify(response.data);
                axios.get(treatAddr)
                .then(response => {
                    treatments = JSON.stringify(response.data);
                    //console.log(treatments)
                    res.render("healthrecords", {health: health, nightscout: nightscout, treatments:treatments});
                })
                .catch(error => {
                    console.log(error);
                });
            })
            .catch(error => {
                console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
        });
    });

app.listen(PORT, function() {
    console.log("listening on port " + PORT);
})