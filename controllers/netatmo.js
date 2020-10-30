
const { json } = require('express');
const request = require('request');
const { response } = require('../app');
require('dotenv').config();


/**
 * getting the token for accessing the data of netatmo
 */

exports.getToken = function(req, res){
    var access_token = null // access_token
  
    // make request options
    var headers = {
        'Host': 'api.netatmo.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        'charset': 'UTF-8'
    }
    var options = {
        url: 'https://api.netatmo.com/oauth2/token',
        method: 'POST',
        headers: headers,
        form: {
          'grant_type': process.env.grant_type,
          'username': process.env.username, // login id
          'password' : process.env.password, // login password
          'client_id': process.env.client_id, // app client_id
          'client_secret': process.env.client_secret, // app secret
          'scope' : "read_station" // scope
        }
    }

    // request access_token
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log("Success")
          json_data = JSON.parse(body) // parse data to json
          access_token = json_data.access_token // get access_token
          token = access_token;
          res.send({access_token : access_token});
        }
        else {
          console.log("Fail : "+ response.statusCode)
          console.log(body)
        }
    })
}


/**
 * Getting the Stats from Netatmo API
 */
exports.getMeans = async (req, res) =>{

    /**
     * Asyncronous Request to authentificate
     * And get a valid token
     */
    var access_token = null // access_token
  
    // make request options
    var headers = {
        'Host': 'api.netatmo.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        'charset': 'UTF-8'
    }
    var options = {
        url: 'https://api.netatmo.com/oauth2/token',
        method: 'POST',
        headers: headers,
        form: {
          'grant_type': process.env.grant_type,
          'username': process.env.username, // login id
          'password' : process.env.password, // login password
          'client_id': process.env.client_id, // app client_id
          'client_secret': process.env.client_secret, // app secret
          'scope' : "read_station" // scope
        }
    }

    // request access_token
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {


            
            console.log("Success")
            json_data = JSON.parse(body) // parse data to json
            access_token = json_data.access_token // get access_token
            console.log({access_token})

            /**
             * Second Asyncronous Request to get the data once authentificated
             */

            // First need to get the right timestamps for the request to be on 7 days
            current_date = new Date();
            var minus_seven_date = new Date();
            minus_seven_date.setDate(current_date.getDate() - 7);
            t_date = Math.floor(minus_seven_date.getTime()/1000);

            // Creating the url using the right parameters from the .env config file
            urlNetatmo = `https://api.netatmo.com/api/getmeasure?device_id=${process.env.device_id}&module_id=${process.env.module_id}&scale=${process.env.scale}&type=${process.env.type}&optimize=${process.env.optimize}&real_time=${process.env.real_time}`;
            
            // Building the request
            var headers = {
                'Host': 'api.netatmo.com',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${access_token}`
            }
            var options = {
                url: urlNetatmo,
                method: 'POST',
                headers: headers,
            }
            
            var data = null;
            
            // Executing the request
            request.get(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log("Success")
                    json_data = JSON.parse(body) // parse data to json
                    
                    // Eventually send the unprocessed data to the client
                    //res.send(json)

                    // Once the request is received I use the data to get the mean, min, and max
                    var mean = 0;
                    var max = -10000000000;
                    var min = 10000000000;
                    var min_date="";
                    var max_date="";
                    var index = 0;
                    for(var element in json_data.body){
                        index++;
                        value = json_data.body[element][0];
                        if(value > max) {
                            max = value;
                            max_date = element;
                        };
                        if(value < min) {
                            min = value;
                            min_date = element;
                        };
                        mean = mean + value;
                    };
                    min_date = new Date(parseInt(min_date) * 1000);
                    max_date = new Date(parseInt(max_date) * 1000);
                    stats = {mean: mean/index, min_value: min, min_date: min_date,max_value: max, max_date: max_date};
                    res.send(stats);
                    return stats;

                }
                else {
                console.log("Fail : "+ response.statusCode)
                console.log(body)
                }
                    
            });
        }
        else {
        console.log("Fail : "+ response.statusCode)
        console.log(body)
    }
})
};

/**
 * Getting the Measures from the API
 */
exports.getMeasures = (req, res) =>{

    /**
     * Creating the request to get the raw data from the netatmo API and device
     */
    // Building the request
    var headers = {
        'Host': 'api.netatmo.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `${req.headers.authorization}`
    }
    var options = {
        url: 'https://api.netatmo.com/api/getmeasure?device_id=70%3Aee%3A50%3A04%3Aa4%3A4e&module_id=02%3A00%3A00%3A04%3Aa0%3Ac8&scale=1day&type=temperature&optimize=false&real_time=false',
        method: 'POST',
        headers: headers,
    }
    
    // Executing the request
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Success")
            json_data = JSON.parse(body) // parse data to json
            res.send(json_data)
        }
        else {
        console.log("Fail : "+ response.statusCode)
        console.log(body)
        }
            
    });
};